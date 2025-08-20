import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { RiArrowGoBackFill } from "react-icons/ri";
import { getAuthToken } from '../Auth/Auth';
const Update = () => {

    let[isLoading, setIsLoading]= useState(true)
    const params = useParams();
    const navigate = useNavigate();
    let [data, setData] = useState(null);

    useEffect(()=>{
      const fetchData =async()=>{
    
          let req = await fetch(`http://localhost:5274/blog/${params.id}`)
          let res = await req.json();
          setData(res)
          setIsLoading(false);
          
         }
      fetchData()
    },[])
    
    const handleClick=async(e)=>{
      e.preventDefault()

      try{
        let update = await fetch(`http://localhost:5274/blog/${params.id}`, 
        {
          method:"PUT",
          headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${getAuthToken}`
          },
          body:JSON.stringify({
            "title":data.title,
            "content":data.content,
            "genre":data.genre
          })

        })
        if(update.ok){
          console.log("successfully updated the data");
          navigate('/dashboard')
        }else{
          console.log("failed to update post")
        }
      }catch(e){
        console.error(e);
        
      }
    }
    if(isLoading){
      return <h2>Loading...</h2>
    }
  return (
   
       <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleClick} 
        method='post' 
        className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-6 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Update a Blog
        </h2>
        <button
             onClick={() => navigate("/dashboard")}
             className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 
                        bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium 
                        rounded-full shadow-md hover:shadow-xl hover:scale-105 
                        transition-all duration-300 ease-in-out"
           >
             <RiArrowGoBackFill/> Back to Dashboard
           </button>  
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-semibold text-gray-700">Title</label>
          <input 
            type="text" 
            placeholder="Enter blog title" 
            required 
            onChange={(e)=>{
             
              setData({...data, title:e.target.value})
            }} 
            value={data.title}
            className="border rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="content" className="font-semibold text-gray-700">Content</label>
          <textarea 
            name="content" 
            id="content" 
            rows="5"
            value={data.content}
            className="border rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>setData({...data, content:e.target.value})}
          ></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="genre" className="font-semibold text-gray-700">Genre</label>
          <input 
            type="text" 
            placeholder="e.g. Tech, Travel..." 
            value={data.genre}
            className="border rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>setData({...data, genre:e.target.value})}
          />
        </div>
         
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
   
  )
}

export default Update
