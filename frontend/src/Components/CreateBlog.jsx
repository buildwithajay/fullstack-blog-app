import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, FileText, Clock, Tag, Image as ImageIcon, Save } from 'lucide-react';
import { getAuthToken } from '../Auth/Auth';

const CreateBlog = () => {
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  let [genre, setGenre] = useState("");
  let [image, setImage] = useState("");
  let [readTime, setReadTime] = useState()
  let [isLoading, setIsLoading] = useState(false)
  let [imagePreview, setImagePreview] = useState(null);
  let navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    
    // Create preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      if(!image) return

      let imageData = new FormData()
      imageData.append('file', image)
      imageData.append('upload_preset', "image-store")
      imageData.append('cloud_name', "dkc0tn86f")

      let postImage = await fetch("https://api.cloudinary.com/v1_1/dkc0tn86f/image/upload", {
        method: "POST",
        body: imageData
      })
      const uploadImageUrl = await postImage.json();
      console.log(uploadImageUrl.secure_url)

      let post = await fetch("https://fullstack-blog-app-l5ph.onrender.com/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({
          "title": title,
          "content": content,
          "genre": genre, 
          "imageUrl": uploadImageUrl.secure_url,
          "readTime": readTime,
        })
      })
      let data = await post.json()
      if(post.ok) {
        console.log("post created", data);
        navigate("/dashboard")
        setIsLoading(false);
      } else {
        console.log("failed to create post")
      }
    } catch(e) {
      console.log('error connecting to backend', e)
    }
  }

  if(isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Publishing article...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center text-gray-600 hover:text-red-600 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">
            Create New Article
          </h1>
          <div className="w-16 h-1 bg-red-600"></div>
        </div>

        <form onSubmit={handleClick} method='post' className="space-y-8">
          {/* Title Section */}
          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <FileText className="w-5 h-5 text-red-600 mr-2" />
              <h2 className="text-xl font-bold text-black">Article Details</h2>
            </div>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                  Article Title *
                </label>
                <input 
                  type="text" 
                  id="title"
                  placeholder="Enter a compelling headline" 
                  required 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-gray-900"
                />
                <p className="text-xs text-gray-500 mt-1">Make it clear, concise, and attention-grabbing</p>
              </div>

              {/* Category and Read Time Row */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Genre/Category */}
                <div>
                  <label htmlFor="genre" className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      id="genre"
                      placeholder="e.g. Politics, Tech, Business" 
                      required
                      onChange={(e) => setGenre(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>

                {/* Read Time */}
                <div>
                  <label htmlFor="readtime" className="block text-sm font-semibold text-gray-700 mb-2">
                    Read Time (minutes) *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="number" 
                      id="readtime"
                      placeholder="5" 
                      required 
                      min="1"
                      onChange={(e) => setReadTime(e.target.value)} 
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <FileText className="w-5 h-5 text-red-600 mr-2" />
              <h2 className="text-xl font-bold text-black">Article Content</h2>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
                Content *
              </label>
              <textarea 
                name="content" 
                id="content" 
                rows="12"
                required
                minLength={20}
                placeholder="Write your article content here. Provide detailed, well-researched information..."
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-gray-900 resize-none"
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">Minimum 20 characters required</p>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <ImageIcon className="w-5 h-5 text-red-600 mr-2" />
              <h2 className="text-xl font-bold text-black">Featured Image</h2>
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Image *
              </label>
              
              {/* Image Preview */}
              {imagePreview && (
                <div className="mb-4">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-64 object-cover border border-gray-300"
                  />
                </div>
              )}

              <div className="border-2 border-dashed border-gray-300 hover:border-red-600 transition-colors duration-200">
                <label htmlFor="image" className="flex flex-col items-center justify-center py-8 cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Click to upload image</span>
                  <span className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</span>
                </label>
                <input 
                  type="file" 
                  id="image"
                  accept="image/*"
                  required
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>

          {/* Publishing Guidelines */}
          <div className="bg-gray-100 border border-gray-200 p-6">
            <h3 className="text-sm font-bold text-black mb-3">Publishing Guidelines</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                Ensure all facts are verified and properly sourced
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                Use clear, professional language appropriate for your audience
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                Include relevant keywords for better discoverability
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                Choose a high-quality featured image that represents your content
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex-1 px-6 py-3 border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center justify-center"
            >
              <Save className="w-5 h-5 mr-2" />
              Publish Article
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateBlog;