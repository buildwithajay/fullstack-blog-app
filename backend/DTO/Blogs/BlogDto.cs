using System;
using System.Collections.Generic;
using backend.DTO.Account;
using backend.DTO.Comment;

namespace backend.DTO.Blogs
{
    public class BlogDto
    {
        public int Id { get; set; }
        public string? Title { get; set; } = string.Empty;
        public string? Content { get; set; } = string.Empty;
        public string? Genre { get; set; } = string.Empty;
        public int ReadTime { get; set; }
        public int Views { get; set; }
        public string? ImageUrl { get; set; } = string.Empty;
        public List<string> ImageUrls { get; set; } = new();
        public UserDto? AppUser { get; set; }
        public DateTime CreatedAT { get; set; } = DateTime.Now;
        public ICollection<CommentDto>? comments { get; set; }
    }
}
