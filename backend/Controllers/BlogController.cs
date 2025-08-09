using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.DTO.Blogs;
using backend.Interfaces;
using backend.Mapper;
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
        public async Task<IActionResult> Create([FromBody] CreateBlogDto createBlog)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            var blogs = createBlog.ToBlogFromCreateDto();
            await _blogRepo.CreateAsync(blogs);
            return Ok();
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
    }
}