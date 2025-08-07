using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Model
{
    public class Comment
    {
        public string Id { get; set; }
        public string Content { get; set; }
        public string BlogId { get; set; }
        public Blog Blog{ get; set; }
    }

    
}