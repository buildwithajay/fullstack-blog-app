using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Model
{
    public class Comment
    {
        public int Id { get; set; }
        public string? Content { get; set; }
        public DateTime CreateAT { get; set; } = DateTime.Now;
        public int BlogId { get; set; }
        public Blog? Blog { get; set; }
        public string? AppUserId { get; set; }
        public AppUser? AppUser { get; set; }
    }

    
}