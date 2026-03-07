import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, FileText, Clock, Tag, Image as ImageIcon, Save } from 'lucide-react';
import { getAuthToken } from '../Auth/Auth';

const CATEGORY_OPTIONS = [
  'Politics',
  'Technology',
  'Business',
  'Science',
  'Health',
  'Sports',
  'Culture',
  'Environment',
  'Opinion',
  'Other',
];

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Politics');
  const [customCategory, setCustomCategory] = useState('');
  const [image, setImage] = useState('');
  const [readTime, setReadTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const finalCategory = useMemo(() => {
    if (selectedCategory === 'Other') {
      return customCategory.trim();
    }
    return selectedCategory;
  }, [selectedCategory, customCategory]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!image) {
      setErrorMessage('Featured image is required.');
      return;
    }

    if (!finalCategory) {
      setErrorMessage('Please select or add a category.');
      return;
    }

    setIsLoading(true);

    try {
      const imageData = new FormData();
      imageData.append('file', image);
      imageData.append('upload_preset', 'image-store');
      imageData.append('cloud_name', 'dkc0tn86f');

      const postImage = await fetch('https://api.cloudinary.com/v1_1/dkc0tn86f/image/upload', {
        method: 'POST',
        body: imageData,
      });
      const uploadImageUrl = await postImage.json();

      const post = await fetch('https://fullstack-blog-app-l5ph.onrender.com/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({
          title,
          content,
          genre: finalCategory,
          imageUrl: uploadImageUrl.secure_url,
          readTime: Number(readTime),
        }),
      });

      if (post.ok) {
        navigate('/dashboard');
        return;
      }

      const data = await post.json();
      setErrorMessage(data?.message || 'Failed to create post.');
    } catch (error) {
      setErrorMessage('Error connecting to backend. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5f8] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-[#d81224] rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Publishing article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f8]">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center text-slate-600 hover:text-[#0a2a8a] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Create New Article</h1>
          <div className="w-16 h-1 bg-[#d81224]"></div>
        </div>

        <form onSubmit={handleClick} method="post" className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <FileText className="w-5 h-5 text-[#0a2a8a] mr-2" />
              <h2 className="text-xl font-bold text-slate-900">Article Details</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">
                  Article Title *
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter a compelling headline"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a2a8a]"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-slate-700 mb-2">
                    Category *
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <select
                      id="category"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a2a8a]"
                    >
                      {CATEGORY_OPTIONS.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedCategory === 'Other' && (
                    <input
                      type="text"
                      placeholder="Type new category"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      className="mt-3 w-full px-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a2a8a]"
                      required
                    />
                  )}
                </div>

                <div>
                  <label htmlFor="readtime" className="block text-sm font-semibold text-slate-700 mb-2">
                    Read Time (minutes) *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="number"
                      id="readtime"
                      placeholder="5"
                      required
                      min="1"
                      onChange={(e) => setReadTime(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a2a8a]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <FileText className="w-5 h-5 text-[#0a2a8a] mr-2" />
              <h2 className="text-xl font-bold text-slate-900">Article Content</h2>
            </div>

            <label htmlFor="content" className="block text-sm font-semibold text-slate-700 mb-2">
              Content *
            </label>
            <textarea
              name="content"
              id="content"
              rows="12"
              required
              minLength={20}
              placeholder="Write your article content here..."
              className="w-full px-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a2a8a] resize-none"
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <ImageIcon className="w-5 h-5 text-[#0a2a8a] mr-2" />
              <h2 className="text-xl font-bold text-slate-900">Featured Image</h2>
            </div>

            {imagePreview && (
              <div className="mb-4">
                <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-md border border-slate-300" />
              </div>
            )}

            <div className="border-2 border-dashed border-slate-300 hover:border-[#0a2a8a] transition-colors rounded-lg">
              <label htmlFor="image" className="flex flex-col items-center justify-center py-8 cursor-pointer">
                <Upload className="w-12 h-12 text-slate-400 mb-2" />
                <span className="text-sm font-medium text-slate-700">Click to upload image</span>
                <span className="text-xs text-slate-500 mt-1">PNG, JPG, GIF up to 10MB</span>
              </label>
              <input type="file" id="image" accept="image/*" required className="hidden" onChange={handleImageChange} />
            </div>
          </div>

          {errorMessage && (
            <div className="bg-red-50 text-red-700 border border-red-200 rounded-md px-4 py-3 text-sm">{errorMessage}</div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex-1 px-6 py-3 border border-slate-300 bg-white text-slate-700 font-semibold rounded-md hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#d81224] text-white font-semibold rounded-md hover:bg-[#b60f1e] transition-colors flex items-center justify-center"
            >
              <Save className="w-5 h-5 mr-2" />
              Publish Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
