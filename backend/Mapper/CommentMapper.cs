using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTO.Comment;
using backend.Model;

namespace backend.Mapper
{
    public static class CommentMapper
    {
        public static CommentDto ToCommentDto(this Comment commentDto)
        {
            return new CommentDto
            {
                Id = commentDto.Id,
                Content = commentDto.Content,
                BlogId = commentDto.BlogId
            };
        }
    }
}