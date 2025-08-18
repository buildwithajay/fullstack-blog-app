using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Model
{
    public class UserDashboard
    {
        public int AppUserId { get; set; }
        public AppUser? appUser { get; set; }
        public Collection<Blog>? Blogs { get; set; }
    }
}