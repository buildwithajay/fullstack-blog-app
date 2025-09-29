import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuthToken, getUserFromToken, isAuthenticate } from "../Auth/Auth";
import { Plus, Edit, Trash2, Eye, FileText, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  let user = getUserFromToken();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserFromToken().role;
        const isAdmin = user.includes("Admin")
        const isManager = user.includes("Manager")
        
        if(isAuthenticate() && isAdmin || isManager) {
          let data = await fetch("https://fullstack-blog-app-l5ph.onrender.com/blog/dashboard", {
            headers: {
              "Authorization": `Bearer ${getAuthToken()}`
            }
          });
          let res = await data.json();
          setBlogs(res);
          setLoading(false);
        } else if(isAuthenticate() && !isAdmin || !isManager) {
          navigate("/blogs")
        }
      } catch(e) {
        console.log(e)
      }
    }
    fetchData();
  }, [handleClick]);

  async function handleClick(id) {
    try {
      let removeBlog = await fetch(`https://fullstack-blog-app-l5ph.onrender.com/blog/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${getAuthToken()}`
        }
      });
      if (removeBlog.ok) {
        console.log("blog deleted successfully");
        setDeleteConfirm(null);
      } else {
        console.log("blog not found");
      }
    } catch (e) {
      console.log("error connecting to db", e);
    }
  }

  function handleUpdate(id) {
    navigate(`/updateblog/${id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-black">
                Content Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and publish your articles
              </p>
            </div>
            <Link
              to="/create"
              className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-semibold text-base transition-colors duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Article
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 uppercase tracking-wide">Total Articles</p>
                <p className="text-3xl font-bold text-black mt-2">{blogs.length}</p>
              </div>
              <FileText className="w-12 h-12 text-red-600" />
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 uppercase tracking-wide">Published</p>
                <p className="text-3xl font-bold text-black mt-2">{blogs.length}</p>
              </div>
              <Eye className="w-12 h-12 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 uppercase tracking-wide">Author</p>
                <p className="text-xl font-bold text-black mt-2">{user?.fullName || 'Admin'}</p>
              </div>
              <div className="w-12 h-12 bg-red-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {(user?.fullName || 'A')[0].toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Table */}
        <div className="bg-white border border-gray-200">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <h2 className="text-xl font-bold text-black">All Articles</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide hidden lg:table-cell">
                    Content Preview
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {blogs.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center">
                      <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 font-medium">No articles yet</p>
                      <p className="text-gray-400 text-sm mt-1">Create your first article to get started</p>
                    </td>
                  </tr>
                ) : (
                  blogs.map((blog) => (
                    <tr 
                      key={blog.id} 
                      className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault()
                        navigate(`/blogdetails/${blog.id}`)
                      }}
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900 hover:text-red-600 transition-colors">
                          {blog.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium uppercase tracking-wide">
                          {blog.genre || 'General'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 hidden lg:table-cell">
                        <div className="max-w-xs truncate">
                          {blog.content}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleUpdate(blog.id)
                            }}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors duration-200"
                            title="Edit article"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirm(blog.id);
                            }}
                            className="inline-flex items-center px-3 py-2 border border-red-300 bg-white text-red-600 text-sm font-medium hover:bg-red-50 transition-colors duration-200"
                            title="Delete article"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full p-6 shadow-xl">
            <div className="flex items-start mb-4">
              <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-black mb-2">
                  Confirm Deletion
                </h3>
                <p className="text-gray-600 text-sm">
                  Are you sure you want to delete this article? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleClick(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white font-medium hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;