import React from 'react'
import moment from 'moment';
const CommentComp = ({ content, author, createdAT}) => {
    const time = createdAT? moment(createdAT).fromNow():"";

return (
    <div  className="bg-gray-50 rounded-2xl p-6">
      <p className="text-gray-800">{content}</p>
      <p className="text-sm text-gray-500 mt-2">- {author}</p>
      <p className="text-xs text-gray-400">
       {time}
      </p>
    </div>
  );
}

export default CommentComp
