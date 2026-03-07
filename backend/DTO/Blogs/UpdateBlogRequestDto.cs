using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.DTO.Blogs
{
    public class UpdateBlogRequestDto
    {
        [Required]
        [MaxLength(30)]
        [MinLength(4)]
        public string? Title { get; set; }

        [Required]
        [MinLength(5)]
        public string? Content { get; set; }

        [Required]
        public string? Genre { get; set; }

        public string? ImageUrl { get; set; }
        public List<string>? ImageUrls { get; set; }
    }
}
