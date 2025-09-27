import React, { useEffect, useState } from 'react'
import { ChevronRight, BookOpen, Clock, Eye, Heart, Filter, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
    const [blogData, setBlogData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [hoveredCard, setHoveredCard] = useState(null);
    const navigate = useNavigate()
    
    useEffect(()=>{
      const fetchBlog=async()=>{
        const res = await fetch("https://fullstack-blog-app-l5ph.onrender.com/blog")
        const data = await res.json()
        //sorted the blog according to the date and time
        const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.createdAT);
        const dateB = new Date(b.createdAT);
        return dateB - dateA; 
      });

        setBlogData(sortedData);
        setIsLoading(false)
        console.log(sortedData)
        
      }
      fetchBlog()
    },[])
    
    const handleClick = (id)=>{
      navigate(`/blogdetails/${id}`)
    }

    if(isLoading)
        return (
       <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin"></div>
              <p className="text-gray-600 font-medium">Loading articles...</p>
            </div>
          </div>)

  return (
    <div className='bg-white min-h-screen'>
      {/* Header Section */}
      <div className='bg-gray-50 py-12 px-6 border-b border-gray-200'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8'>
            <div>
              <h1 className='text-4xl font-bold text-black mb-4'>
                <span className='text-red-600'>All</span> Stories
              </h1>
              <div className='w-16 h-1 bg-red-600 mb-4'></div>
              <p className='text-xl text-gray-600 max-w-2xl'>
                Comprehensive coverage of breaking news, analysis, and features from our newsroom.
              </p>
            </div>
            
            {/* Filter and Search */}
            <div className='flex flex-col sm:flex-row gap-4 mt-6 lg:mt-0'>
              <div className='relative'>
                <Search className='w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  className='pl-10 pr-4 py-2 border border-gray-300 focus:border-red-600 focus:outline-none w-64'
                />
              </div>
              <button className='flex items-center space-x-2 border border-gray-300 px-4 py-2 hover:bg-gray-50 transition-colors duration-200'>
                <Filter className='w-4 h-4' />
                <span>Filter</span>
              </button>
            </div>
          </div>
          
          {/* Category Tags */}
          <div className='flex flex-wrap gap-2'>
            {['All', 'Politics', 'Technology', 'Business', 'Culture', 'Sports'].map((category) => (
              <button 
                key={category}
                className={`px-4 py-2 text-sm font-medium border transition-colors duration-200 ${
                  category === 'All' 
                    ? 'bg-red-600 text-white border-red-600' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className='max-w-7xl mx-auto px-6 py-12'>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogData && blogData.map((item, index) => (
            <article 
              key={item.id}
              onClick={()=>handleClick(item.id)}
              className="bg-white border-b-4 border-gray-200 hover:border-red-600 transition-all duration-200 cursor-pointer group shadow-sm hover:shadow-md"
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-red-600 text-white px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                    {item.genre || 'News'}
                  </span>
                </div>
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-3 group-hover:text-red-600 transition-colors line-clamp-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {item.content}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {`${item.readTime || 5} min`}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {item.views || '1.2k'}
                    </div>
                  </div>
                  <Heart className="w-4 h-4 hover:text-red-500 cursor-pointer transition-colors" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm">
                    <div className="w-8 h-8 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                      <span className="text-xs font-semibold text-gray-600">
                        {(item?.appUser?.fullName || 'A')[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {item?.appUser?.fullName || 'Staff Writer'}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {new Date(item.createdAT || Date.now()).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Section */}
        <div className="text-center mt-12 py-8 border-t border-gray-200">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-semibold text-lg transition-colors duration-200">
            Load More Stories
          </button>
          <p className="text-gray-500 text-sm mt-4">
            Showing {blogData?.length || 0} of {blogData?.length || 0} articles
          </p>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-50 py-16 px-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            Never Miss a Story
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get the latest news and analysis delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 border border-gray-300 focus:border-red-600 focus:outline-none"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-semibold transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default Blog