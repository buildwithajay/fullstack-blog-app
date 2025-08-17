using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

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
    }
}