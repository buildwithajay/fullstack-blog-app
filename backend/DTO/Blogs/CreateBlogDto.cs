using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.DTO.Blogs
{
    public class CreateBlogDto
    {
        [Required]
        [MaxLength(60)]
        [MinLength(4)]
        public string? Title { get; set; }

        [Required]
        [MinLength(5)]
        public string? Content { get; set; }

        public string? ImageUrl { get; set; }
        public List<string>? ImageUrls { get; set; }

        [Required]
        public int ReadTime { get; set; }

        public DateTime CreatedAT { get; set; } = DateTime.UtcNow;

        [Required]
        public string? Genre { get; set; }
    }
}
