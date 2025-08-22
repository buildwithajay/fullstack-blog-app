using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Build.Framework;
using Microsoft.EntityFrameworkCore;


namespace backend.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> dbContextOptions) : base(dbContextOptions)
        {
        }
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Comment> Comments { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            List<IdentityRole> roles = new List<IdentityRole>
        {
            new IdentityRole
                {
                    Id = "1",
                    Name = "Admin",
                    NormalizedName = "ADMIN"
             },
             new IdentityRole
                {
                    Id= "2",
                    Name = "User",
                    NormalizedName = "USER"
                }
        };
            builder.Entity<IdentityRole>().HasData(roles);
             builder.Entity<Blog>()
                .HasOne(p => p.AppUser)
                .WithMany(u => u.Blogs)
                .HasForeignKey(b => b.AppUserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Comment>()
                .HasOne(b => b.Blog)
                .WithMany(c => c.comments)
                .HasForeignKey(b => b.BlogId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    
      
    }
}