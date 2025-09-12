using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.DTO.Comment;
using backend.Extensions;
using backend.Interfaces;
using backend.Mapper;
using backend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("/comment")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepo;
        private readonly IBlogRepository _blogRepo;
        private readonly UserManager<AppUser> _userManager;
        public CommentController(ICommentRepository commentRepo, IBlogRepository blogRepo, UserManager<AppUser> userManager)
        {
            _commentRepo = commentRepo;
            _blogRepo = blogRepo;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var comment = await _commentRepo.GetAllAsync();
            var commentDto = comment.Select(s => s.ToCommentDto());
            return Ok(commentDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var comment = await _commentRepo.GetByIdAsync(id);
            if (comment is null)
            {
                return NotFound();
            }
            return Ok(comment.ToCommentDto());
        }
        [HttpPost]
        [Route("{blogId}")]
        [Authorize]
        public async Task<IActionResult> Create([FromRoute] int blogId, CreateCommentDto createComment)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if (!await _blogRepo.ExistingBlogAsync(blogId))
            {
                return NotFound("blog not found");
            }
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username!);
            var commentModel = createComment.ToCommentFromCreate(blogId);
            commentModel.AppUserId = appUser!.Id;
            await _commentRepo.CreateAsync(commentModel);
            return CreatedAtAction(nameof(GetById), new { id = commentModel.Id }, commentModel.ToCommentDto());
        }
        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username!);
            if (appUser is null)
            {
                return Unauthorized();
            }
            var comment = await _commentRepo.GetByIdAsync(id);
            if (comment is null)
            {
                return NotFound();
            }
            var isOwner = comment.AppUserId == appUser.Id;
            var isAdmin = User.IsInRole("Admin");
            var isManager = User.IsInRole("Manager");
            if (!isOwner && !isAdmin && !isManager)
            {
                return Forbid();
            }
            await _commentRepo.DeleteAsync(id);
            return NoContent();

        }

        [HttpPut]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] int id, UpdateCommentRequestDto requestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username!);
            if (appUser is null)
            {
                return Unauthorized();
            }
            var comment = await _commentRepo.GetByIdAsync(id);
            if (comment is null)
            {
                return NotFound();
            }
            var isOwner = comment.AppUserId == appUser.Id;
            if (!isOwner)
            {
                return Forbid();

            }
            await _commentRepo.UpdateAsync(id, requestDto);
            return Ok(comment.ToCommentDto());

        }

    }
}