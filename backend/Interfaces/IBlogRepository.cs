using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Model;

namespace backend.Interfaces
{
    public interface IBlogRepository
    {
        Task<List<Blog>> GetAllAsync();
        Task<Blog> CreateAsync(Blog blog);
        Task<Blog?> GetById(int id);
        Task<Blog?> DeleteAsync(int id);

    }
}