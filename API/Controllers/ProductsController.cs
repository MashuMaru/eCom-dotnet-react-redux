using API.Authentication;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

// [ServiceFilter(typeof(ApiKeyAuthFilter))]
public class ProductsController : BaseApiController
{
    private readonly StoreContext _context;

    public ProductsController(StoreContext context)
    { 
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts()
    {
        var products = await _context.Products.ToListAsync();

        if (!products.Any())
            return NoContent();

        return Ok(products);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Product>> GetProductById(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
            return NotFound();

        return Ok(product);
    }
}