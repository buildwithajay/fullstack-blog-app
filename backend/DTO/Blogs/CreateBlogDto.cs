using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTO.Blogs
{
    public class CreateBlogDto
    {
        [Required]
        [MaxLength(30)]
        [MinLength(4)]
        public string? Title { get; set; }
        [Required]
        [MinLength(5)]
        public string? Content { get; set; }
        public string? ImageUrl { get; set; }
        [Required]
        public int ReadTime { get; set; }
        public DateTime CreatedAT { get; set; } = DateTime.UtcNow;
        [Required]

        public string? Genre { get; set; }
        
    }
}