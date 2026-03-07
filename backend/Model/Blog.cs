using System;
using System.Collections.Generic;

namespace backend.Model
{
    public class Blog
    {
        public int Id { get; set; }
        public string? Title { get; set; } = string.Empty;
        public string? Content { get; set; } = string.Empty;
        public string? ImageUrl { get; set; } = string.Empty;
        public string? ImageUrls { get; set; } = string.Empty;
        public string? Genre { get; set; } = string.Empty;
        public int ReadTime { get; set; }
        public int Views { get; set; }
        public DateTime CreatedAT { get; set; }

        public string? AppUserId { get; set; } = string.Empty;
        public AppUser? AppUser { get; set; }
        public ICollection<Comment>? comments { get; set; }
    }
}
