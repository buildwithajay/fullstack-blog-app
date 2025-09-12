using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.DTO.Blogs;
using backend.Interfaces;
using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class BlogRepository : IBlogRepository
    {
        private readonly ApplicationDbContext _context;
        public BlogRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Blog> CreateAsync(Blog blog)
        {
            await _context.Blogs.AddAsync(blog);
            await _context.SaveChangesAsync();
            return blog;
        }

        public async Task<Blog?> DeleteAsync(int id)
        {
            var blog = await _context.Blogs.FirstOrDefaultAsync(x => x.Id == id);
            if (blog == null)
            {
                return null;
            }
            _context.Blogs.Remove(blog);
            await _context.SaveChangesAsync();
            
            return blog;
        }

        public async Task<bool> ExistingBlogAsync(int id)
        {
            return await _context.Blogs.AnyAsync(s => s.Id == id);
        }

        public async Task<List<Blog>> GetAllAsync()
        {
            return await _context.Blogs.Include(c=>c.comments)!.ThenInclude(x=>x.AppUser).ToListAsync();

        }

        public async Task<Blog?> GetById(int id)
        {
            var blog = await _context.Blogs.Include(x=>x.AppUser).FirstOrDefaultAsync(x => x.Id == id);
            return blog;
        }

     

        public async Task<Blog?> GetViewAsync(int id)
        {
            var blog = await _context.Blogs.FindAsync(id);
            if (blog is null)
            {
                return null;
            }
            blog.Views += 1;
            await _context.SaveChangesAsync();
            return blog;
        }

        public async Task<Blog?> UpdateAsync(int id, UpdateBlogRequestDto updateBlogRequestDto)
        {
            var blog = await _context.Blogs.FirstOrDefaultAsync(x => x.Id == id);
            if (blog == null)
            {
                return null;
            }
            blog.Title = updateBlogRequestDto.Title;
            blog.Content = updateBlogRequestDto.Content;
            blog.Genre = updateBlogRequestDto.Genre;
            await _context.SaveChangesAsync();
            return blog;

        }
    }
}