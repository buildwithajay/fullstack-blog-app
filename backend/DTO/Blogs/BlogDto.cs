using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTO.Comment;

namespace backend.DTO.Blogs
{
    public class BlogDto
    {
        public int Id { get; set; }
        public string? Title { get; set; } = string.Empty;
        public string? Content { get; set; } = string.Empty;
        public string? Genre { get; set; } = string.Empty;
        public string? ImageUrl { get; set; } = string.Empty;
        public DateTime CreatedAT { get; set; } = DateTime.Now;
        public ICollection<CommentDto>? comments { get; set; }
    }
}