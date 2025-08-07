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
        public string? Title { get; set; }
        public string? Content { get; set; }
        public DateTime CreatedAT { get; set; }
        public ICollection<CommentDto>? comments { get; set; }
    }
}