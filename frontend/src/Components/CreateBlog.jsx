import React from 'react'

const CreateBlog = () => {
  return (
    <div>
      <form action="" method='post'>
        <h2>Create a Blog</h2>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" placeholder='blog title' />
          
          <textarea name="content" id="content"></textarea>
        </div>

      </form>
    </div>
  )
}

export default CreateBlog
