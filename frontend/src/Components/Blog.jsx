import React, { useEffect, useState } from 'react'
import { ChevronRight, BookOpen, Clock, Eye, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Blog = () => {
    const [blogData, setBlogData] = useState();
    const [isLoading, setIsLoading] = useState(true);
      const [hoveredCard, setHoveredCard] = useState(null);
      const navigate = useNavigate()
    useEffect(()=>{
      const fetchBlog=async()=>{
        const res = await fetch("http://localhost:5274/blog")
        const data = await res.json()
        setBlogData(data);
        setIsLoading(false)
      }
      fetchBlog()
    },[])
    const handleClick = (id)=>{
      navigate(`/blogdetails/${id}`)
    }
if(isLoading)
    return <h1>Loading...</h1>

  return (
    <div className='max-w-[1280px] mx-auto p-10 '>
     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8  ">
            {blogData.map((item, index) => (
              <article 
                key={item.id}
                onClick={()=>handleClick(item.id)}
                className="group bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/20 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <div className="h-48 bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {item.genre || 'Article'}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className={`w-16 h-16 text-white/80 transform transition-transform duration-300 ${hoveredCard === item.id ? 'scale-125 rotate-12' : ''}`} />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {item.content}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {item.readTime || '5 min read'}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {item.views || '1.2k'}
                      </div>
                    </div>
                    <Heart className="w-4 h-4 hover:text-red-500 cursor-pointer transition-colors" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      By {item.author || 'Anonymous'}
                    </span>
                    <button className="flex items-center text-purple-600 hover:text-purple-700 font-medium text-sm group-hover:translate-x-1 transition-transform">
                      Read More
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
    </div>
  )
}

export default Blog
