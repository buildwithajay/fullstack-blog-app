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
        DbSet<Blog> blogs { get; set; }
}
}


