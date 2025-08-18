using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTO.Blogs;
using backend.DTO.Comment;
using backend.Model;

namespace backend.Mapper
{
    public static class BlogMapper
    {
        public static BlogDto ToBlogDto(this Blog blogDto)
        {
            return new BlogDto
            {
                Id = blogDto.Id,
                Title = blogDto.Title,
                Content = blogDto.Content,
                Genre = blogDto.Genre,
                CreatedAT = blogDto.CreatedAT,
                comments = blogDto.comments?.Select(s => s.ToCommentDto()).ToList()


            };
        }
        public static Blog ToBlogFromCreateDto(this CreateBlogDto createBlog)
        {
            return new Blog
            {
                Title = createBlog.Title,
                Content = createBlog.Content,
                Genre=createBlog.Genre
            };
        }
        public static Blog ToBlogFromUpdateDto(this UpdateBlogRequestDto updateBlogRequestDto)
        {
            return new Blog
            {
                Title = updateBlogRequestDto.Title,
                Content = updateBlogRequestDto.Content,
                Genre = updateBlogRequestDto.Genre
            };
        }
    }
}