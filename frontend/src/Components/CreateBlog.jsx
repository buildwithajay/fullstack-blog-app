import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  let [formData, setFormData]= useState({});
  let [title, setTitle]= useState();
  let [content, setContent]= useState();
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
        title,
        content
    })
    })
    if(post.ok){
      
      console.log("post created");
      navigate("/")
    }else{
      console.log("failed to create post")
    }

    }catch(e){
      console.log('error connecting to backend', e)
    }
  }

  return (
    <div>
      <form onSubmit={handleClick} method='post' className=' p-4'>
        <h2 className=' font-bold p-2'>Create a Blog</h2>
     
         <div className='flex gap-3 items-center p-2'>
           <label htmlFor="title" className='font-semibold text-[1rem]'>Title</label>
          <input type="text" placeholder='blog title' required onChange={(e)=>setTitle(e.target.value)} className='border border-black p-2 text-[1rem]'/>
         </div>
          <div className='flex gap-3 items-center p-2'>
            <label htmlFor="content" className='font-semibold text-[1rem]' required>Content</label>
          <textarea 
          name="content" 
          id="content" 
          className='border p-2 text-[1rem] border-black'
          onChange={(e)=>setContent(e.target.value)}
           ></textarea>
          
          </div>
          <input type="submit" value={"Submit"} className=' text-white p-2 bg-blue-600 rounded-md'/>
      </form>
    </div>
  )
}

export default CreateBlog
