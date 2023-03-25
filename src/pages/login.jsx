import React from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {

  const navigate = useNavigate();
  const handleClick = () => {
    const username = document.getElementById('username').value
    const pass = document.getElementById('pass').value

    if(username === 'abc@gmail.com' && pass === 'abc123') {
        navigate("/dashboard/index")
    } else {
      alert("Invalid Username or Password")
    }
  }
  return (
    <div className='h-full flex justify-end border-2 bg-blue-600'>
      <div className="flex items-center bg-white w-2/4" >
        <section className="w-full row-span-3 bg-green-300 h-3/4" >
        <h2 className="text-center p-3">Login to Continue</h2>
        <div className='text-center mt-20 p-4 space-x-4'>
          <label>Username</label>
          <input id="username" type="text" className='w-2/4 p-2 outline-none'/>
        </div>
        <div  className='text-center p-4 space-x-4'>
          <label>Password</label>
          <input id="pass" type="password" className='w-2/4 p-2 outline-none'/>
        </div>
        <div className='text-center mt-10'>
          <button className="w-40 bg-blue-600 text-white p-3 rounded-md" onClick={handleClick}>Login</button>
        </div>
        </section>
      </div>
    </div>
  )
}

export default Login