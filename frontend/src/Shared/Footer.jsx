import React from 'react'

const Footer = () => {
  let date = new Date();


  return (
    <div>
      <p className=' text-center'>All right reserved {date.getFullYear()}</p>
    </div>
  )
}

export default Footer
