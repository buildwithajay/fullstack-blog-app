import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { getUserFromToken, isAuthenticate } from '../Auth/Auth';
const CommentComp = ({ content, author, createdAT, user}) => {
    const [isUser, setIsUser]= useState(false);
    const time = createdAT? moment(createdAT).fromNow():"";
   

    useEffect(()=>{
      const isuserAuth =()=>{
        if(isAuthenticate()){
       const getUser = getUserFromToken();
      const email = getUser?.email;
      if(user == email){
      setIsUser(true)
        }else {
      setIsUser(false)
      }
    }
      }
      isuserAuth()
    },[isAuthenticate()]);
    
    

return (
    <div  className="bg-gray-50 rounded-2xl p-6">
      <p className="text-gray-800">{content}</p>
      <p className="text-sm text-gray-500 mt-2">- {author}</p>
      <p className="text-xs text-gray-400">
       {time}
      </p> 
      {
        isUser && 
        <div>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      }

    </div>
  );
}

export default CommentComp
