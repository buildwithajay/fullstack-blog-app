using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTO.Account;
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
                ReadTime = blogDto.ReadTime,
            
                Views = blogDto.Views,
                ImageUrl = blogDto.ImageUrl,
                 AppUser= blogDto.AppUser == null ? null : new UserDto
                 {
                    Id = blogDto.AppUser.Id,
                    FullName = blogDto.AppUser.FullName,
                    Email = blogDto.AppUser.Email
                 },
             
                comments = blogDto.comments?.Select(s => s.ToCommentDto()).ToList()


            };
        }
        public static Blog ToBlogFromCreateDto(this CreateBlogDto createBlog)
        {
            return new Blog
            {
                Title = createBlog.Title,
                Content = createBlog.Content,
                Genre = createBlog.Genre,
                ImageUrl = createBlog.ImageUrl,
                ReadTime = createBlog.ReadTime,
            
                CreatedAT = createBlog.CreatedAT
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