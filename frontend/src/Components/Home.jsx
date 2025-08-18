import React, { useEffect, useState } from 'react'
import Header from '../Shared/Header'

const Home = () => {
    const [blogData, setBlogData]= useState([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(()=>{
      const fetchData= async()=>{
        let api = await fetch("http://localhost:5274/blog")
      let data =await api.json();
      setBlogData(data);
      setLoading(false);
      }
      fetchData();
    },[])

   
    
    if(loading){
      return <h2>Loading ...</h2>
    }
  return (
    <div>
      {blogData.map((items)=>(
          <div key={items.id} >
            <h2 className='font-semibold '>{items.title}</h2>
          <p>{items.content}</p>
        
          </div>
      ))}
    
    </div>



    
  )
}

export default Home
