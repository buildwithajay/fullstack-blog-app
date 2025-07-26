using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projectO.api.Data;

namespace projectO.api.Controller
{
    [ApiController]
    [Route("/[controller]")]
    public class BlogController : ControllerBase
    {
        private readonly BlogDbContext _blog;
        public BlogController(BlogDbContext blog)
        {

            _blog = blog;
        }

        [HttpGet]
        public async Task<IActionResult> GetPosts()
        {
            var posts = await _blog.blogs.ToListAsync();
            return Ok(posts);
        }
    }
}


