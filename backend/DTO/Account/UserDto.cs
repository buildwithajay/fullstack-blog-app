using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTO.Account
{
    public class UserDto
    {
        public string? Id { get; set; }
        public string? FullName { get; set; }

        public string? Email { get; set; }
    }
}