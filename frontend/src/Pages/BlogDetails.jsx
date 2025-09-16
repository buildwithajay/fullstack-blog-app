import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { 
  ArrowLeft, 
  Clock, 
  Eye, 
  Calendar, 
  Tag, 
  User, 
  Heart,
  Share2,
  Bookmark,
  MessageCircle
} from 'lucide-react';
import CommentComp from '../Components/CommentComp';

const BlogDetails = () => {
  const [blogInfo, setBlogInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      let req = await fetch(`http://localhost:5274/blog/${params.id}`);
      let res = await req.json();
      setBlogInfo(res);
      setLoading(false);
      console.log(res)
     

    };
    fetchBlog();
  }, [params.id]);

  const formatDate = (dateString) => {
    if (!dateString || dateString === "0001-01-01T00:00:00") {
      return "Recently published";
    }
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  

  const getReadTime = (readTime) => {
    if (readTime && readTime > 0) {
      return `${readTime} min read`;
    }
    return "5 min read"; // Default read time
  };

  const getGenreColor = (genre) => {
    const colors = {
      Tech: "bg-blue-100 text-blue-800",
      lifestyle: "bg-green-100 text-green-800",
      business: "bg-purple-100 text-purple-800",
      health: "bg-red-100 text-red-800",
      Travel: "bg-yellow-100 text-yellow-800",
      default: "bg-gray-100 text-gray-800"
    };
    return colors[genre?.toLowerCase()] || colors.default;
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Back Button */}
        <div className="relative max-w-4xl mx-auto px-6 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to articles
          </button>
        </div>

        <div className="relative max-w-4xl mx-auto px-6">
          {/* Genre Tag */}
          {blogInfo?.genre && (
            <div className="mb-4">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getGenreColor(blogInfo.genre)}`}>
                <Tag className="w-4 h-4 mr-1" />
                {blogInfo.genre.charAt(0).toUpperCase() + blogInfo.genre.slice(1)}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {blogInfo?.title || "Article Title"}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-white/80 mb-8">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{formatDate(blogInfo?.createdAT)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span>{getReadTime(blogInfo?.readTime)}</span>
            </div>
            <div className="flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              <span>{blogInfo?.views || 0} views</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                isLiked 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
              Like
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`flex items-center px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                isBookmarked 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
              Save
            </button>
            <button className="flex items-center px-4 py-2 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200/20 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-blue-200/20 rounded-full opacity-60 animate-bounce" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
          {/* Featured Image Placeholder */}
          {blogInfo?.imageUrl ? (
            <img 
              src={blogInfo.imageUrl} 
              alt={blogInfo.title}
              className="w-full h-64 md:h-96 object-cover rounded-2xl mb-8 shadow-lg"
            />
          ) : (
            <div className="w-full h-64 md:h-96 bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600 rounded-2xl mb-8 flex items-center justify-center shadow-lg">
              <div className="text-center text-white">
                <User className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <p className="text-lg font-medium opacity-90">Featured Image</p>
              </div>
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-800 leading-relaxed text-lg">
              {blogInfo?.content ? (
                <div>
                  {blogInfo.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-6 text-justify">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-justify">
                    Welcome to this amazing article! This is where the main content of your blog post would appear. 
                    The content section is designed to provide an excellent reading experience with proper typography, 
                    spacing, and visual hierarchy.
                  </p>
                  <p className="text-justify">
                    This modern blog design ensures that your readers can focus on the content while enjoying 
                    a beautiful and professional layout. The responsive design works perfectly across all devices.
                  </p>
                  <p className="text-justify">
                    Add your engaging content here to captivate your audience and provide them with valuable insights 
                    and information they're looking for.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Author Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {blogInfo?.appUser?.fullName || "Anonymous Author"}
                </h3>
                <p className="text-gray-600">Content Creator & Writer</p>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center mb-6">
              <MessageCircle className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">Comments</h3>
            </div>
            
            {blogInfo?.comments && blogInfo.comments.length > 0 ? (
              <div className="space-y-4">
                {blogInfo.comments.map((comment, index) => (
                 <CommentComp key={index} content={comment.content} author={comment.createdBy} createdAT={comment.createdAT}/>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No comments yet</p>
                <p className="text-gray-400">Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Articles CTA */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-center text-white shadow-2xl">
          <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
          <p className="text-lg opacity-90 mb-6">
            Discover more amazing content and stay updated with our latest posts.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Explore More Articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;