using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTO.Account;
using Microsoft.AspNetCore.Identity;

namespace backend.Model
{
    public class AppUser : IdentityUser
    {
        

        public string FullName { get; set; } = string.Empty;
        public ICollection<Blog>? Blogs { get; set; }

    }
}