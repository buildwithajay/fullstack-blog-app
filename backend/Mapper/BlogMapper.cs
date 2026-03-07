using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using backend.DTO.Account;
using backend.DTO.Blogs;
using backend.DTO.Comment;
using backend.Model;

namespace backend.Mapper
{
    public static class BlogMapper
    {
        public static BlogDto ToBlogDto(this Blog blog)
        {
            var imageUrls = BuildImageUrlList(blog.ImageUrls, blog.ImageUrl);

            return new BlogDto
            {
                Id = blog.Id,
                Title = blog.Title,
                Content = blog.Content,
                Genre = blog.Genre,
                CreatedAT = blog.CreatedAT,
                ReadTime = blog.ReadTime,
                Views = blog.Views,
                ImageUrl = imageUrls.FirstOrDefault() ?? string.Empty,
                ImageUrls = imageUrls,
                AppUser = blog.AppUser == null
                    ? null
                    : new UserDto
                    {
                        Id = blog.AppUser.Id,
                        FullName = blog.AppUser.FullName,
                        Email = blog.AppUser.Email
                    },
                comments = blog.comments?.Select(s => s.ToCommentDto()).ToList()
            };
        }

        public static Blog ToBlogFromCreateDto(this CreateBlogDto createBlog)
        {
            var imageUrls = BuildImageUrlList(createBlog.ImageUrls, createBlog.ImageUrl);

            return new Blog
            {
                Title = createBlog.Title,
                Content = createBlog.Content,
                Genre = createBlog.Genre,
                ImageUrl = imageUrls.FirstOrDefault() ?? string.Empty,
                ImageUrls = SerializeImageUrls(imageUrls),
                ReadTime = createBlog.ReadTime,
                CreatedAT = createBlog.CreatedAT
            };
        }

        public static Blog ToBlogFromUpdateDto(this UpdateBlogRequestDto updateBlogRequestDto)
        {
            var imageUrls = BuildImageUrlList(updateBlogRequestDto.ImageUrls, updateBlogRequestDto.ImageUrl);

            return new Blog
            {
                Title = updateBlogRequestDto.Title,
                Content = updateBlogRequestDto.Content,
                Genre = updateBlogRequestDto.Genre,
                ImageUrl = imageUrls.FirstOrDefault() ?? string.Empty,
                ImageUrls = SerializeImageUrls(imageUrls)
            };
        }

        public static List<string> BuildImageUrlList(IEnumerable<string>? imageUrls, string? imageUrl)
        {
            var urlsFromArray = imageUrls?
                .Where(url => !string.IsNullOrWhiteSpace(url))
                .Select(url => url.Trim())
                .ToList() ?? new List<string>();

            if (urlsFromArray.Count > 0)
            {
                return urlsFromArray;
            }

            if (string.IsNullOrWhiteSpace(imageUrl))
            {
                return new List<string>();
            }

            var trimmed = imageUrl.Trim();

            if (trimmed.StartsWith("[") && trimmed.EndsWith("]"))
            {
                try
                {
                    var parsed = JsonSerializer.Deserialize<List<string>>(trimmed);
                    if (parsed is { Count: > 0 })
                    {
                        return parsed.Where(url => !string.IsNullOrWhiteSpace(url)).Select(url => url.Trim()).ToList();
                    }
                }
                catch
                {
                    // fallback to single-image behavior
                }
            }

            return new List<string> { trimmed };
        }

        public static List<string> BuildImageUrlList(string? imageUrlsJson, string? fallbackImageUrl)
        {
            if (!string.IsNullOrWhiteSpace(imageUrlsJson))
            {
                try
                {
                    var parsed = JsonSerializer.Deserialize<List<string>>(imageUrlsJson);
                    if (parsed is { Count: > 0 })
                    {
                        return parsed.Where(url => !string.IsNullOrWhiteSpace(url)).Select(url => url.Trim()).ToList();
                    }
                }
                catch
                {
                    // fallback to single-image behavior
                }
            }

            if (string.IsNullOrWhiteSpace(fallbackImageUrl))
            {
                return new List<string>();
            }

            return new List<string> { fallbackImageUrl.Trim() };
        }

        public static string SerializeImageUrls(List<string> imageUrls)
        {
            if (imageUrls.Count == 0)
            {
                return string.Empty;
            }

            return JsonSerializer.Serialize(imageUrls);
        }
    }
}
