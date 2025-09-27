import React, { useEffect, useState } from 'react';
import { ChevronRight, BookOpen, Users, TrendingUp, Star, ArrowRight, Clock, Eye, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [blogData, setBlogData] = useState([]);
  const [headlineBlogs, setHeadlineBlogs] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  let navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let api = await fetch("https://fullstack-blog-app-l5ph.onrender.com/blog");
        let data = await api.json();
        const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.createdAT);
        const dateB = new Date(b.createdAT);
        return dateB - dateA; })
         setBlogData(sortedData.slice(0, 6)); 
         setHeadlineBlogs(sortedData.slice(0, 5)); // Get first 5 for headlines
        setLoading(false);
     
      } catch (error) {
        
        setBlogData([
          {
            id: 1,
            title: "The Future of Web Development: Trends to Watch in 2025",
            content: "Exploring the latest technologies and frameworks that are shaping the future of web development...",
            author: "Sarah Johnson",
            readTime: 5,
            views: "2.1k",
            genre: "Technology"
          },
          {
            id: 2,
            title: "Building Scalable React Applications",
            content: "Learn best practices for creating maintainable and scalable React applications that grow with your business...",
            author: "Mike Chen",
            readTime: "8 min read",
            views: "1.8k",
            genre: "Development"
          },
          {
            id: 3,
            title: "Design Systems That Scale",
            content: "How to create and maintain design systems that work across multiple platforms and teams...",
            author: "Emily Rodriguez",
            readTime: "6 min read",
            views: "3.2k",
            genre: "Design"
          }
        ]);
        setHeadlineBlogs([
          {
            id: 1,
            title: "The Future of Web Development: Trends to Watch in 2025",
            content: "Exploring the latest technologies and frameworks that are shaping the future of web development...",
            author: "Sarah Johnson",
            readTime: 5,
            views: "2.1k",
            genre: "Technology",
            createdAT: new Date().toISOString(),
            appUser: { fullName: "Sarah Johnson" }
          },
          {
            id: 2,
            title: "Building Scalable React Applications",
            content: "Learn best practices for creating maintainable and scalable React applications...",
            author: "Mike Chen", 
            readTime: 8,
            views: "1.8k",
            genre: "Development",
            createdAT: new Date().toISOString(),
            appUser: { fullName: "Mike Chen" }
          },
          {
            id: 3,
            title: "Design Systems That Scale",
            content: "How to create and maintain design systems that work across multiple platforms...",
            author: "Emily Rodriguez",
            readTime: 6,
            views: "3.2k", 
            genre: "Design",
            createdAT: new Date().toISOString(),
            appUser: { fullName: "Emily Rodriguez" }
          }
        ]);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Swiper functionality for headlines - simplified approach
  useEffect(() => {
    let interval;
    
    console.log('Setting up auto-slide - total slides:', headlineBlogs.length);
    
    if (headlineBlogs.length > 1) {
      interval = setInterval(() => {
        setCurrentSlide(prev => {
          const next = (prev + 1) % headlineBlogs.length;
          console.log('Auto-slide: moving to slide', next);
          return next;
        });
      }, 4000);
      
      console.log('Auto-slide interval started');
    }

    return () => {
      if (interval) {
        clearInterval(interval);
        console.log('Auto-slide interval cleared');
      }
    };
  }, [headlineBlogs.length]); // Only depend on length

  const handleClick =(id)=>{
      navigate(`/blogdetails/${id}`)
  }
  const handleArticle=()=>{
    navigate('/blogs')
  }
  const startReading = (e)=>{
    e.preventDefault()
    navigate("/blogs")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-red-100 rounded px-3 py-1 mb-6">
                <div className="w-2 h-2 bg-red-600 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-red-700 uppercase tracking-wide">Breaking News</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
                Stay Informed
                <br />
                <span className="text-red-600">Stay Ahead</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Your trusted source for breaking news, in-depth analysis, and expert insights on politics, technology, and global affairs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-semibold text-lg transition-colors duration-200 flex items-center justify-center" onClick={(e)=>{startReading(e)}}>
                  Start Reading
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-3 font-semibold text-lg hover:bg-gray-50 transition-colors duration-200">
                  Explore Topics
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative h-80 bg-red-600 overflow-hidden cursor-pointer" onClick={() => headlineBlogs[currentSlide] && handleClick(headlineBlogs[currentSlide].id)}>
                {/* Background Images - All slides */}
                {headlineBlogs.map((blog, index) => (
                  <div 
                    key={blog.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {blog.imageUrl ? (
                      <img 
                        src={blog.imageUrl} 
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-red-700 to-red-900"></div>
                    )}
                    <div className="absolute inset-0 bg-black/60"></div>
                  </div>
                ))}

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-end text-white">
                  <div className="mb-4">
                  
                  </div>
                  
                  <div className="transition-all duration-500 ease-in-out">
                    <h3 className="text-3xl font-bold mb-4 leading-tight">
                      {headlineBlogs[currentSlide]?.title || 'Latest News Update'}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold">
                            {(headlineBlogs[currentSlide]?.appUser?.fullName || 'Staff')[0].toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">
                            {headlineBlogs[currentSlide]?.appUser?.fullName || 'NepalNiti Staff'}
                          </p>
                          <p className="text-white/70 text-xs">
                            {headlineBlogs[currentSlide]?.createdAT 
                              ? new Date(headlineBlogs[currentSlide].createdAT).toLocaleDateString('en-GB', {
                                  day: 'numeric',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })
                              : 'Just now'
                            }
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {headlineBlogs[currentSlide]?.readTime || 5} min
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {headlineBlogs[currentSlide]?.views || '1.2k'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 right-8 flex space-x-2">
                  {headlineBlogs.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentSlide(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentSlide ? 'bg-white' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>

                {/* Next/Prev arrows */}
                {headlineBlogs.length > 1 && (
                  <>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentSlide((prev) => prev === 0 ? headlineBlogs.length - 1 : prev - 1);
                      }}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-all duration-200"
                    >
                      <ChevronRight className="w-5 h-5 rotate-180" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentSlide((prev) => (prev + 1) % headlineBlogs.length);
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-all duration-200"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Progress bar for auto-slide */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
                  <div 
                    className="h-full bg-white transition-all duration-100 ease-linear"
                    style={{
                      width: '100%',
                      animation: headlineBlogs.length > 1 ? 'progress 4s linear infinite' : 'none'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="border-r border-gray-200 last:border-r-0 pr-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-black mb-2">500+</h3>
              <p className="text-gray-600 text-sm uppercase tracking-wide">Published Articles</p>
            </div>
            <div className="border-r border-gray-200 last:border-r-0 pr-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-black mb-2">10K+</h3>
              <p className="text-gray-600 text-sm uppercase tracking-wide">Daily Readers</p>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-black mb-2">50+</h3>
              <p className="text-gray-600 text-sm uppercase tracking-wide">Expert Journalists</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">
              <span className="text-red-600">Featured</span> Stories
            </h2>
            <div className="w-16 h-1 bg-red-600 mb-4"></div>
            <p className="text-xl text-gray-600 max-w-2xl">
              Essential reading from our newsroom, covering the stories that matter most.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogData.map((item, index) => (
              <article 
                key={item.id}
                onClick={()=>handleClick(item.id)}
                className="bg-white border-b-4 border-gray-200 hover:border-red-600 transition-all duration-200 cursor-pointer group"
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
                  <h3 className="text-xl font-bold text-black mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
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
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {item?.appUser?.fullName || 'Staff Writer'}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {new Date(item.createdAT || Date.now()).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-semibold text-lg transition-colors duration-200 flex items-center" onClick={handleArticle}>
              View All Stories
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get the latest news and analysis delivered straight to your inbox. Join thousands of informed readers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 text-black border-0 focus:outline-none"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-semibold transition-colors duration-200">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            No spam, unsubscribe at any time
          </p>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-black mb-8">More from NepalNiti</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Politics", count: "156 articles", color: "bg-red-600" },
              { title: "Technology", count: "89 articles", color: "bg-blue-600" },
              { title: "Business", count: "203 articles", color: "bg-green-600" },
              { title: "Culture", count: "127 articles", color: "bg-purple-600" }
            ].map((topic, index) => (
              <div key={index} className="border border-gray-200 p-6 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                <div className={`w-12 h-12 ${topic.color} mb-4 flex items-center justify-center`}>
                  <div className="w-6 h-6 bg-white"></div>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">{topic.title}</h3>
                <p className="text-gray-600 text-sm">{topic.count}</p>
                <div className="mt-4 flex items-center text-red-600 font-medium">
                  Explore <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        
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
  );
};

export default Home;