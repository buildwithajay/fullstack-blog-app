using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTO.Account;
using backend.Interfaces;
using backend.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("/account")]
    public class AccooutContoller : ControllerBase
    {
        private readonly UserManager<AppUser> _user;
        private readonly ITokenService _token;
        private readonly SignInManager<AppUser> _signInManager;
        public AccooutContoller(UserManager<AppUser> user, ITokenService token, SignInManager<AppUser> signInManager)
        {
            _user = user;
            _token = token;
            _signInManager = signInManager;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            return Ok();
        }
    }
}