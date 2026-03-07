import React, { useEffect, useMemo, useState } from 'react';
import { ChevronRight, BookOpen, Clock, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getFeaturedImage } from '../utils/blogImages';

const BASE_CATEGORIES = ['All', 'Politics', 'Technology', 'Business', 'Science', 'Health', 'Sports', 'Culture', 'Environment'];

const normalizeCategory = (value) => (value || '').trim();

const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch('https://fullstack-blog-app-l5ph.onrender.com/blog');
        const data = await res.json();
        const sortedData = data.sort((a, b) => new Date(b.createdAT) - new Date(a.createdAT));
        setBlogData(sortedData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, []);

  const allCategories = useMemo(() => {
    const fromPosts = blogData
      .map((item) => normalizeCategory(item.genre))
      .filter(Boolean);

    return Array.from(new Set([...BASE_CATEGORIES, ...fromPosts]));
  }, [blogData]);

  const filteredBlogs = useMemo(() => {
    return blogData.filter((item) => {
      const category = normalizeCategory(item.genre);
      const selectedByCategory = activeCategory === 'All' || category.toLowerCase() === activeCategory.toLowerCase();
      const query = searchTerm.trim().toLowerCase();
      const selectedBySearch =
        !query ||
        item.title?.toLowerCase().includes(query) ||
        item.content?.toLowerCase().includes(query) ||
        category.toLowerCase().includes(query);

      return selectedByCategory && selectedBySearch;
    });
  }, [blogData, activeCategory, searchTerm]);

  const handleClick = (id) => navigate(`/blogdetails/${id}`);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5f8] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-[#d81224] rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f8] min-h-screen">
      <div className="bg-white py-12 px-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                <span className="text-[#0a2a8a]">Latest</span>{' '}
                <span className="text-[#d81224]">News</span>
              </h1>
              <div className="w-16 h-1 bg-[#d81224] mb-4"></div>
              <p className="text-xl text-slate-600 max-w-2xl">Coverage, analysis, and stories from Nepalniti newsroom.</p>
            </div>

            <div className="relative w-full lg:w-auto">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles..."
                className="pl-10 pr-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0a2a8a] focus:outline-none w-full lg:w-72"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {allCategories.map((category) => {
              const active = category.toLowerCase() === activeCategory.toLowerCase();
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm font-semibold border rounded-md transition-colors ${
                    active
                      ? 'bg-[#0a2a8a] text-white border-[#0a2a8a]'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-[#d81224] hover:text-[#0a2a8a]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((item) => (
            <article
              key={item.id}
              onClick={() => handleClick(item.id)}
              className="bg-white border border-slate-200 rounded-lg hover:border-[#d81224] transition-all cursor-pointer group shadow-sm hover:shadow-md"
            >
              <div className="h-48 bg-slate-200 relative overflow-hidden rounded-t-lg">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-[#d81224] text-white px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded">
                    {item.genre || 'News'}
                  </span>
                </div>
                {getFeaturedImage(item.imageUrl) ? (
                  <img
                    src={getFeaturedImage(item.imageUrl)}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-slate-400" />
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#0a2a8a] transition-colors clamp-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-slate-600 mb-4 clamp-3 leading-relaxed">{item.content}</p>

                <div className="flex items-center justify-between text-sm text-slate-500 mb-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {`${item.readTime || 5} min`}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm">
                    <div className="w-8 h-8 bg-[#0a2a8a]/10 text-[#0a2a8a] rounded-full mr-3 flex items-center justify-center font-semibold">
                      {(item?.appUser?.fullName || 'A')[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{item?.appUser?.fullName || 'Staff Writer'}</p>
                      <p className="text-slate-500 text-xs">
                        {new Date(item.createdAT || Date.now()).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#d81224] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center mt-10 py-10 bg-white border border-slate-200 rounded-lg">
            <p className="text-slate-600">No news found for this category/search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
