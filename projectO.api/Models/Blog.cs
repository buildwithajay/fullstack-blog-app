using System;

namespace projectO.api.Models
{
    public class Blog
    {
        public int Id { get; set; }
        public required string Topic { get; set; }
        public required string description { get; set; }
    }

}

