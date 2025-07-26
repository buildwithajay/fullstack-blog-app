using System;
using Microsoft.EntityFrameworkCore;
using projectO.api.Models;

namespace projectO.api.Data
{
    public class BlogDbContext : DbContext
    {
        public BlogDbContext(DbContextOptions<BlogDbContext> options) : base(options)
        {

        }
       public DbSet<Blog> blogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Blog>().HasData(
                new { Id = 1, Title = "Infaltion", Content="The job market is clutter right now i dont know why" }
            
            );
        }
}
}


