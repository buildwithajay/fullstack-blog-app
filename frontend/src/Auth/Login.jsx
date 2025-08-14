import React from 'react'

const Login = () => {
  return (
    <div>
        <form>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" id='email'/>
            </div>
            <div className=' flex gap-2'>
                <label htmlFor="password">Password</label>
                <div>
                    <input type="password" name="password" id="password" />
                </div>
                
            </div>
        </form>
    </div>
  )
}

export default Login
