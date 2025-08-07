using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTO.Comment
{
    public class CommentDto
    {
      
        public int Id { get; set; }
        public string? Content { get; set; }
        public string? BlogId { get; set; }
    }
}