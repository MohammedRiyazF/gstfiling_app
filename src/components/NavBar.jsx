import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='flex-col justify-center gap-10 bg-blue-500 text-white'>
      <div className='h-3/4 flex items-center p-2 text-4xl text-white'>
        <img src="/gsticon.jpeg" alt="gst icon" width="70" className='rounded-lg mr-2' />
        <h1>GSTSafe</h1>
      </div>
      <section className='flex justify-center gap-10 bg-blue-300 text-white'>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
        </div>
        {/* <div>
          <Link to="/download">Download</Link>
        </div> */}
      </section>
    </nav>
  )
}

export default Navbar;

