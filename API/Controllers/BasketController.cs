using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Basket = API.Entities.Basket;

namespace API.Controllers;

public class BasketController : BaseApiController
{
    private readonly StoreContext _context;

    public BasketController(StoreContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetrieveBasket();

        if (basket == null) return NotFound();
        
        return new BasketDto
        {
            Id = basket.Id,
            BuyerId = basket.BuyerId,
            Items = basket.Items.Select(item => new BasketItemDto
            {
                ProductId = item.ProductId,
                Name = item.Product.Name,
                Brand = item.Product.Brand,
                PictureUrl = item.Product.PictureUrl,
                Price = item.Product.Price,
                Quantity = item.Quantity,
                Type = item.Product.Type 
            }).ToList()
        };;
    }

    [HttpPost]
    public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
    {
        var basket = await RetrieveBasket() ?? await RetrieveBasket();

        var product = await _context.Products.FindAsync(productId);

        if (product == null) return NotFound();
        
        basket.AddItem(product, quantity);

        var result = await _context.SaveChangesAsync() > 0;

        if (result) return StatusCode(201);
        
        return BadRequest(new ProblemDetails { Title = "Problem saving item to basket." });
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
        // get basket
        // remove item or reduce quantity
        // save changes
        return Ok();
    }
    
    // I would move this logic into class library/services.
    private async Task<Basket> RetrieveBasket()
    {
        return await _context.Baskets
            .Include(x => x.Items)
            .ThenInclude(x => x.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
    }
    
    private async Task<Basket> CreateBasket()
    {
        var buyerId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions
        {
            IsEssential = true,
            Expires = DateTime.Now.AddDays(30)
        };
        
        Response.Cookies.Append("buyerId", buyerId, cookieOptions);
        var basket = new Basket
        {
            BuyerId = buyerId
        };

        await _context.Baskets.AddAsync(basket);

        return basket;
    }
}