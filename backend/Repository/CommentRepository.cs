using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.DTO.Comment;
using backend.Interfaces;
using backend.Migrations;
using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDbContext _context;

        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Comment> CreateAsync(Comment comment)
        {
            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();
            return comment;
        }

        public async Task<Comment?> DeleteAsync(int id)
        {
            var comment = await _context.Comments.FirstOrDefaultAsync(x => x.Id == id);
            if (comment == null)
            {
                return null;
            }
            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return comment;

        }

        public async Task<List<Comment>> GetAllAsync()
        {
            var comment = await _context.Comments.Include(x=>x.AppUser).ToListAsync();
            return comment;
        }

        public async Task<Comment?> GetByIdAsync(int id)
        {
            var comment = await _context.Comments.Include(x => x.AppUser).FirstOrDefaultAsync(x => x.Id == id);
            if (comment is null)
                return null;
            return comment;
        }

        public async Task<Comment?> UpdateAsync(int id, UpdateCommentRequestDto requestDto)
        {
            var comment = await _context.Comments.Include(a => a.AppUser).FirstOrDefaultAsync(x => x.Id == id);
            if (comment is null)
            {
                return null;
            }
            comment.Content = requestDto.Content;
            await _context.SaveChangesAsync();
            return comment;

        }
    }
}