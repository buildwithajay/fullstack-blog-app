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
                BlogId = commentDto.BlogId,
                CreatedAT = commentDto.CreateAT,
                Email = commentDto.AppUser?.Email,
                CreatedBy = commentDto.AppUser?.FullName
            };
        }
        public static Comment ToCommentFromCreate(this CreateCommentDto createCommentDto, int blogId)
        {
            return new Comment
            {
                Content = createCommentDto.Content,
                BlogId = blogId
            };
        }
        public static Comment ToCommentFromUpdate(this UpdateCommentRequestDto updateComment)
        {
            return new Comment
            {
                Content = updateComment.Content
            };
        }
    }
}