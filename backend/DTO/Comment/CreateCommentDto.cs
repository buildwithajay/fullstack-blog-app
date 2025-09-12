using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTO.Comment
{
    public class CreateCommentDto
    {
        [Required]
        public string? Content { get; set; }
        [Required]
        public int BlogId { get; set; }
    }
}