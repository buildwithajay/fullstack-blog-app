using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Model
{
    public class Blog
    {
        public int Id { get; set; }
        public string? Title { get; set; } = string.Empty;
        public string? Content { get; set; } = string.Empty;
        public string? ImageUrl { get; set; } = string.Empty;
        public string? Genre { get; set; } = string.Empty;
        public DateTime CreatedAT { get; set; }
        public ICollection<Comment>? comments { get; set; }
    }
}