using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;
public class StoreContext : DbContext // DbContext inheritance from EFCore.
{
    public StoreContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Product> Products { get; set; } // Name of the table and it's model.
    public DbSet<Basket> Baskets { get; set; }
}
