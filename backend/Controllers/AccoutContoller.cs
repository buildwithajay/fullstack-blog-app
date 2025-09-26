using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTO.Account;
using backend.Interfaces;
using backend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("/account")]
    public class AccoutContoller : ControllerBase
    {
        private readonly UserManager<AppUser> _user;
        private readonly ITokenService _token;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AccoutContoller(UserManager<AppUser> user, ITokenService token, SignInManager<AppUser> signInManager, RoleManager<IdentityRole> roleManager)
        {
            _user = user;
            _token = token;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest("failed to connect");
                if (loginDto.UserName == null) return BadRequest("username not provided");
                var user = await _user.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.UserName.ToLower());
                if (user == null) return Unauthorized("user invalid");

                var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password!, false);

                if (!result.Succeeded) return Unauthorized("username or password is incorrect");
                var roles = await _user.GetRolesAsync(user);
                return Ok(new NewUserDto
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Token = _token.CreateAsync(user, roles)
                });
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromForm] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("failed to connect");
                    
                }
              
                var appUser = new AppUser
                {
                    UserName = registerDto.UserName,
                    Email = registerDto.Email,
                    FullName = registerDto.FullName!,
           
                };
                if (string.IsNullOrEmpty(registerDto.Password))
                {
                    return BadRequest("password is required");
                }
                var createdUser = await _user.CreateAsync(appUser, registerDto.Password);
                if (createdUser.Succeeded)
                {
                    var roleResult = await _user.AddToRoleAsync(appUser, "User");

                    var roles = await _user.GetRolesAsync(appUser);
                    if (roleResult.Succeeded)
                    {
                        return Ok(new NewUserDto
                        {
                            FullName = appUser.FullName,
                            UserName = appUser.UserName,
                            Email = appUser.Email,
                            Token = _token.CreateAsync(appUser, roles)
                        });
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createdUser.Errors);
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPost("/add-role")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddRole(AddRoleDto roleDto)
        {
            var user = await _user.FindByNameAsync(roleDto.UserName!);
            if (user is null) return NotFound("user not found");
            if (!await _roleManager.RoleExistsAsync(roleDto.Role!)) return BadRequest("role doesnot exists");

            var result = await _user.AddToRoleAsync(user, roleDto.Role!);
            return result.Succeeded ? Ok(result) : BadRequest(result.Errors);

        }
    }

}