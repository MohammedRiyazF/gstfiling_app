import { gql, useQuery } from '@apollo/client';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import bcrypt from "bcryptjs-react";


const CREDENTIALS = gql`query credentials {
  composition_dealers {
    id
    Username
    Password
  }
}
`

const Login = () => {
  const { data } = useQuery(CREDENTIALS)
  const credentials = data?.composition_dealers
  const navigate = useNavigate();
  const handleClick = (event) => {
    event.stopPropagation()
    const username = document.getElementById('username').value
    const pass = document.getElementById('pass').value
    const temp = credentials.find((user) => username === user?.Username)
    if(parseInt(event.target.value) === 1) {
      temp ?
        bcrypt.compareSync(pass, temp?.Password) ? navigate(`/dashboard/index/${temp?.id}`) : alert("Wrong password !")
        : alert("No matching users !")
    }
    else {
      navigate('/returns/gst_cmp_02/index')
    }
  }
  return (
    <div className='h-full flex justify-end border-2 bg-blue-600'>
      <div className="flex items-center bg-white w-2/4" >
        <section className="w-full row-span-3 bg-green-300 h-3/4" >
          <h2 className="text-center p-3">Login to Continue</h2>
          <div className='text-center mt-20 p-4 space-x-4'>
            <label>Username</label>
            <input id="username" type="text" className='w-2/4 p-2 outline-none' />
          </div>
          <div className='text-center p-4 space-x-4'>
            <label>Password</label>
            <input id="pass" type="password" className='w-2/4 p-2 outline-none' />
          </div>
          <div className='text-center mt-10'>
            <button className="w-40 bg-blue-600 text-white p-3 rounded-md" onClick={handleClick} value={1} >Login</button>
          </div>
          <hr className='m-5' />
          <div className=' flex justify-center items-center mt-10 gap-5'>
            <p>New to Platform ? </p>
            <button className="w-40 bg-blue-600 text-white p-3 rounded-md" onClick={handleClick} value={2} >Register</button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Login