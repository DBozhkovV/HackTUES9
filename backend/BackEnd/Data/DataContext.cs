using BackEnd.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Data
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Feed> Feed { get; set; }
        public DbSet<Likes> Likes { get; set; }
        public DbSet<Coments> Coments { get; set; }
        public DataContext(DbContextOptions options) : base(options)
        {
        }
    }
}
