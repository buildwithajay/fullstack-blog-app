using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTO.Account;
using backend.Interfaces;
using backend.Model;
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
        public AccoutContoller(UserManager<AppUser> user, ITokenService token, SignInManager<AppUser> signInManager)
        {
            _user = user;
            _token = token;
            _signInManager = signInManager;
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
                
                var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

                if (!result.Succeeded) return Unauthorized("username or password is incorrect");

                return Ok(new NewUserDto
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Token= _token.Create(user)
                 });
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
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
                    Email = registerDto.Email
                };
                if (string.IsNullOrEmpty(registerDto.Password))
                {
                    return BadRequest("password is required");
                }
                var createdUser = await _user.CreateAsync(appUser, registerDto.Password);
                if (createdUser.Succeeded)
                {
                    var roleResult = await _user.AddToRoleAsync(appUser, "User");
                    if (roleResult.Succeeded)
                    {
                        return Ok(new NewUserDto
                        {
                            UserName = appUser.UserName,
                            Email = appUser.Email,
                            Token = _token.Create(appUser)

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
    }
}