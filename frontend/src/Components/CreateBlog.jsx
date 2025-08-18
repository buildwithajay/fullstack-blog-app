import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { RiArrowGoBackFill } from "react-icons/ri";

const CreateBlog = () => {
  let [title, setTitle]= useState();
  let [content, setContent]= useState();
  let [genre, setGenre]= useState();
  let navigate = useNavigate();

  const handleClick=async (e)=>{
     e.preventDefault();
    try{
      let post = await fetch("http://localhost:5274/blog", {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          "title": title,
          "content":content,
          "genre":genre
        })
      })
      if(post.ok){
        console.log("post created");
        navigate("/dashboard")
      }else{
        console.log("failed to create post")
      }
    }catch(e){
      console.log('error connecting to backend', e)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
      
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 
                   bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium 
                   rounded-full shadow-md hover:shadow-xl hover:scale-105 
                   transition-all duration-300 ease-in-out"
      >
        <RiArrowGoBackFill/> Back to Dashboard
      </button>

      <form 
        onSubmit={handleClick} 
        method='post' 
        className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-6 space-y-5 animate-fadeIn"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create a Blog
        </h2>
     
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-semibold text-gray-700">Title</label>
          <input 
            type="text" 
            placeholder="Enter blog title" 
            required 
            onChange={(e)=>setTitle(e.target.value)} 
            className="border rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="content" className="font-semibold text-gray-700">Content</label>
          <textarea 
            name="content" 
            id="content" 
            rows="5"
            className="border rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>setContent(e.target.value)}
          ></textarea>
        </div>
    
        <div className="flex flex-col gap-2">
          <label htmlFor="genre" className="font-semibold text-gray-700">Genre</label>
          <input 
            type="text" 
            placeholder="e.g. Tech, Travel..." 
            className="border rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>setGenre(e.target.value)}
          />
        </div>
         
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md 
                     hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default CreateBlog;
