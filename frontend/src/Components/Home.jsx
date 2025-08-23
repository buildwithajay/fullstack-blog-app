import React, { useEffect, useState } from 'react';
import { ChevronRight, BookOpen, Users, TrendingUp, Star, ArrowRight, Clock, Eye, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  let navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let api = await fetch("http://localhost:5274/blog");
        let data = await api.json();
        setBlogData(data.slice(0, 6)); 
        setLoading(false);
      } catch (error) {
        
        setBlogData([
          {
            id: 1,
            title: "The Future of Web Development: Trends to Watch in 2025",
            content: "Exploring the latest technologies and frameworks that are shaping the future of web development...",
            author: "Sarah Johnson",
            readTime: "5 min read",
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
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleClick =(id)=>{
      navigate(`/blogdetails/${id}`)
  }
  const handleArticle=()=>{
    navigate('/blogs')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 mb-8 shadow-lg border border-white/20">
            <Star className="w-4 h-4 text-yellow-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">Featured Blog Platform</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
            Discover Stories That
            <br />
            <span className="text-gradient animate-pulse">Inspire & Inform</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of readers exploring cutting-edge insights, tutorials, and stories from industry experts across technology, design, and innovation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center">
              Start Reading
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-white/20">
              Explore Categories
            </button>
          </div>
        </div>
        
 
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-60 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-indigo-200 rounded-full opacity-60 animate-bounce" style={{animationDelay: '2s'}}></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">500+</h3>
              <p className="text-gray-600">Published Articles</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">10K+</h3>
              <p className="text-gray-600">Active Readers</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">50+</h3>
              <p className="text-gray-600">Expert Authors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Featured <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Articles</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dive into our most popular and trending content, carefully curated for curious minds.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center mx-auto" onClick={handleArticle} >
              View All Articles
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join our community of curious minds and never miss out on the latest insights, tutorials, and stories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  Subscribe Now
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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