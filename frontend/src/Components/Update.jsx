import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, FileText, Tag, Clock, Save, AlertCircle } from 'lucide-react';
import { getAuthToken } from '../Auth/Auth';

const Update = () => {
    let [isLoading, setIsLoading] = useState(true)
    let [isSaving, setIsSaving] = useState(false)
    const params = useParams();
    const navigate = useNavigate();
    let [data, setData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
          let req = await fetch(`https://fullstack-blog-app-l5ph.onrender.com/blog/${params.id}`)
          let res = await req.json();
          setData(res)
          setIsLoading(false);
         }
      fetchData()
    }, [])
    
    const handleClick = async (e) => {
      e.preventDefault()
      setIsSaving(true)

      try {
        let update = await fetch(`https://fullstack-blog-app-l5ph.onrender.com/blog/${params.id}`, 
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getAuthToken}`
          },
          body: JSON.stringify({
            "title": data.title,
            "content": data.content,
            "genre": data.genre
          })
        })
        if(update.ok) {
          console.log("successfully updated the data");
          navigate('/dashboard')
        } else {
          console.log("failed to update post")
          setIsSaving(false)
        }
      } catch(e) {
        console.error(e);
        setIsSaving(false)
      }
    }

    if(isLoading) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin"></div>
            <p className="text-gray-600 font-medium">Loading article...</p>
          </div>
        </div>
      )
    }

    if(isSaving) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin"></div>
            <p className="text-gray-600 font-medium">Updating article...</p>
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
              Edit Article
            </h1>
            <div className="w-16 h-1 bg-red-600"></div>
          </div>

          <form onSubmit={handleClick} method='post' className="space-y-8">
            {/* Article Details Section */}
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
                    placeholder="Enter blog title" 
                    required 
                    onChange={(e) => {
                      setData({...data, title: e.target.value})
                    }} 
                    value={data?.title || ''}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-gray-900"
                  />
                </div>

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
                      value={data?.genre || ''}
                      onChange={(e) => setData({...data, genre: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-gray-900"
                    />
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
                  value={data?.content || ''}
                  placeholder="Write your article content here..."
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-gray-900 resize-none"
                  onChange={(e) => setData({...data, content: e.target.value})}
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  Last modified: {data?.updatedAt ? new Date(data.updatedAt).toLocaleDateString() : 'Not yet updated'}
                </p>
              </div>
            </div>

            {/* Warning Notice */}
            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-yellow-800 mb-1">
                    Important Notice
                  </h3>
                  <p className="text-sm text-yellow-700">
                    Changes will be published immediately. Ensure all information is accurate before saving.
                  </p>
                </div>
              </div>
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
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    )
}

export default Update
