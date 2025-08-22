import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuthToken } from "../Auth/Auth";
const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      let data = await fetch("http://localhost:5274/blog");
      let res = await data.json();
      setBlogs(res);
      setLoading(false);
    };
    fetchData();
  }, [handleClick]);

  async function handleClick(id) {
    try {
      let removeBlog = await fetch(`http://localhost:5274/blog/${id}`, {
        method: "DELETE",
        headers:{
          "Authorization": `Bearer ${getAuthToken()}`
        }
      });
      if (removeBlog.ok) {
        console.log("blog deleted successfully");
      } else {
        console.log("blog not found");
      }
    } catch (e) {
      console.log("error connecting to db", e);
    }
  }
  function handleUpdate(id){

    navigate(`/updateblog/${id}`)
  }

  if (loading) {
    return <h2 className="text-center text-xl mt-10">Loading...</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 relative">
      {/* Header with Create Blog Button */}
      <div className="flex justify-between items-center max-w-6xl mx-auto mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Blog Dashboard
        </h1>
        <Link
          to="/create"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out"
        >
          + Create Blog
        </Link>
      </div>

      {/* Blog Table */}
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6 overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 font-semibold text-gray-700">Title</th>
              <th className="p-3 font-semibold text-gray-700">Genre</th>
              <th className="p-3 font-semibold text-gray-700">Content</th>
              <th className="p-3 font-semibold text-gray-700 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium text-gray-800">{blog.title}</td>
                <td className="p-3 text-gray-600">{blog.genre}</td>
                <td className="p-3 text-gray-600 truncate max-w-xs sm:max-w-sm">
                  {blog.content}
                </td>
                <td className="p-3 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition text-sm sm:text-base"
                  onClick={()=>{handleUpdate(blog.id)}}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition text-sm sm:text-base"
                    onClick={() => {
                      handleClick(blog.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
