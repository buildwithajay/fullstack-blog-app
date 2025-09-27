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
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin
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
      let req = await fetch(`https://fullstack-blog-app-l5ph.onrender.com/blog/${params.id}`);
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
      default: "bg-red-600 text-white"
    };
    return colors[genre?.toLowerCase()] || colors.default;
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="max-w-4xl mx-auto px-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 hover:text-red-600 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to stories
          </button>
        </div>
      </div>

      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Category Tag */}
        {blogInfo?.genre && (
          <div className="mb-4">
            <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-wide ${getGenreColor(blogInfo.genre)}`}>
              {blogInfo.genre.charAt(0).toUpperCase() + blogInfo.genre.slice(1)}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
          {blogInfo?.title || "Article Title"}
        </h1>

        {/* Article Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center space-x-6 text-gray-600 mb-4 sm:mb-0">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">{formatDate(blogInfo?.createdAT)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">{getReadTime(blogInfo?.readTime)}</span>
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              <span className="text-sm">{blogInfo?.views || 0} views</span>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded transition-colors duration-200">
              <Facebook className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-400 hover:bg-gray-100 rounded transition-colors duration-200">
              <Twitter className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-700 hover:bg-gray-100 rounded transition-colors duration-200">
              <Linkedin className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded transition-colors duration-200 ${
                isBookmarked 
                  ? 'text-red-600 bg-red-50' 
                  : 'text-gray-600 hover:text-red-600 hover:bg-gray-100'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Featured Image */}
        {blogInfo?.imageUrl ? (
          <img 
            src={blogInfo.imageUrl} 
            alt={blogInfo.title}
            className="w-full h-64 md:h-96 object-cover mb-8"
          />
        ) : (
          <div className="w-full h-64 md:h-96 bg-gray-200 mb-8 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <User className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg font-medium">Featured Image</p>
            </div>
          </div>
        )}
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white">
          {/* Article Body */}
          <div className="prose prose-lg max-w-none mb-12">
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

          {/* Article Actions */}
          <div className="flex items-center justify-between py-6 border-t border-gray-200 mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center px-4 py-2 border rounded transition-colors duration-200 ${
                  isLiked 
                    ? 'bg-red-600 text-white border-red-600' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                Like
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50 transition-colors duration-200">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Published: {formatDate(blogInfo?.createdAT)}
            </div>
          </div>

          {/* Author Section */}
          <div className="bg-gray-50 p-6 mb-8">
            <h3 className="text-lg font-bold text-black mb-4">About the Author</h3>
            <div className="flex items-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-xl">
                  {(blogInfo?.appUser?.fullName || 'A')[0].toUpperCase()}
                </span>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-black">
                  {blogInfo?.appUser?.fullName || "Staff Writer"}
                </h4>
                <p className="text-gray-600">Content Creator & Journalist</p>
                <p className="text-sm text-gray-500 mt-1">
                  Covering news and analysis for NepalNiti
                </p>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="border-t border-gray-200 pt-8 mb-8">
            <div className="flex items-center mb-6">
              <MessageCircle className="w-6 h-6 text-red-600 mr-3" />
              <h3 className="text-2xl font-bold text-black">Comments</h3>
            </div>
            
            {blogInfo?.comments && blogInfo.comments.length > 0 ? (
              <div className="space-y-4">
                {blogInfo.comments.map((comment, index) => (
                 <CommentComp key={index} content={comment.content} user={comment.email} author={comment.createdBy} createdAT={comment.createdAT}/>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No comments yet</p>
                <p className="text-gray-400">Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Stories CTA */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-black mb-4">More from NepalNiti</h3>
          <p className="text-xl text-gray-600 mb-8">
            Stay informed with our latest news and analysis
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-semibold text-lg transition-colors duration-200"
            >
              Latest Stories
            </button>
            <button
              onClick={() => navigate('/blogs')}
              className="border border-gray-300 text-gray-700 px-8 py-3 font-semibold text-lg hover:bg-gray-50 transition-colors duration-200"
            >
              All Articles
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-black py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Stay Updated
          </h3>
          <p className="text-xl text-gray-300 mb-8">
            Get breaking news and analysis delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-semibold transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;