import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { RiArrowGoBackFill } from "react-icons/ri";
import { getAuthToken } from '../Auth/Auth';

const CreateBlog = () => {
  let [title, setTitle]= useState("");
  let [content, setContent]= useState("");
  let [genre, setGenre]= useState("");
  let [image, setImage]= useState("");
  let [readTime, setReadTime]= useState()
  let [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate();

  const handleClick=async (e)=>{
     e.preventDefault();
     setIsLoading(true)
    try{
      if(!image)  return

      let imageData = new FormData()
      imageData.append('file', image)
      imageData.append('upload_preset', "image-store")
      imageData.append('cloud_name', "dkc0tn86f")

      let postImage = await fetch("https://api.cloudinary.com/v1_1/dkc0tn86f/image/upload", {
        method:"POST",
        body: imageData
      })
      const uploadImageUrl = await postImage.json();
      console.log(uploadImageUrl.secure_url)

      let post = await fetch("https://fullstack-blog-app-l5ph.onrender.com/blog", {
        method: "POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization": `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({
          "title": title,
          "content":content,
          "genre":genre, 
          "imageUrl":uploadImageUrl.secure_url,
          "readTime":readTime,
        })
      })
      let data = await post.json()
      if(post.ok){
        console.log("post created", data);
        navigate("/dashboard")
        setIsLoading(false);
      }else{
        console.log("failed to create post")
      }
    }catch(e){
      console.log('error connecting to backend', e)
    }
  }

  if(isLoading){
    return (
     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading article...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
      
   
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
            required
            minLength={20}
            className="border rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>setContent(e.target.value)}
          ></textarea>
        </div>
    
        <div className="flex flex-col gap-2">
          <label htmlFor="genre" className="font-semibold text-gray-700">Genre</label>
          <input 
            type="text" 
            placeholder="e.g. Tech, Travel..." 
            required
            className="border rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>setGenre(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="image" className="font-semibold text-gray-700">Image</label>
          <input 
            type="file" 
            placeholder="e.g. Tech, Travel..." 
            required
            className="border rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>setImage(e.target.files[0])}
          />
        </div>
         <div className="flex flex-col gap-2">
          <label htmlFor="readtime" className="font-semibold text-gray-700">Read Time</label>
          <input 
            type="text" 
            placeholder="Read time" 
            required 
            onChange={(e)=>setReadTime(e.target.value)} 
            className="border rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
