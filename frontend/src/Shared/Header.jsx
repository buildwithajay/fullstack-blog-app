import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between p-4 max-w-[1080px] items-center mx-auto'>
      <div>
        NepalNiti
      </div>
      <div>
        <ul className='flex gap-4'>
          <li>Home</li>
          <li>Featured</li>
          <li>Login</li>
        </ul>
      </div>
    </div>
  )
}

export default Header
