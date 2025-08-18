using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.DTO.Blogs;
using backend.Interfaces;
using backend.Mapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [Route("/blog")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IBlogRepository _blogRepo;
        public BlogController(IBlogRepository blogRepo)
        {
            _blogRepo = blogRepo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var blogs = await _blogRepo.GetAllAsync();
            var blogDto = blogs.Select(s => s.ToBlogDto());
            return Ok(blogDto);
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateBlogDto createBlog)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            var blogs = createBlog.ToBlogFromCreateDto();
            await _blogRepo.CreateAsync(blogs);
            return Ok(blogs.ToBlogDto());
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("cannot connect to db");
            }
            var blogs = await _blogRepo.GetById(id);
            if (blogs == null)
            {
                return NotFound("blog not found");
            }
            return Ok(blogs.ToBlogDto());
        }
        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("cannot access");
            }
            var blog = await _blogRepo.DeleteAsync(id);
            if (blog == null)
            {
                return NotFound("blog doesnot exist");

            }
            return NoContent();
        }
        [HttpPut]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] int id, UpdateBlogRequestDto updateBlogRequestDto)

        {
            if (!ModelState.IsValid)
            {
                return BadRequest("cannot access");

            }
            var blog = await _blogRepo.UpdateAsync(id, updateBlogRequestDto);
            if (blog == null) return NotFound();
            return Ok(blog.ToBlogDto());
        }
    }
}