import React from 'react'

const Home = () => {
  return (
    <div className='home flex justify-end items-start'>
      <div className='bg-white w-2/4 h-3/4 rounded-md mt-16 mr-5 shadow-lg p-2'>
          <div className='flex justify-center items-center gap-2 '>
            <img src='/gsticon.jpeg' alt="gsticon" width={50} className="rounded-md" />
            <h1 className='text-green-400 shadow-md'><b>GSTSAFE</b></h1>
          </div>
          <div className='text-center space-y-[15px] flex-1 h-full pt-20'>
            <h2>A Secure</h2>
            <h1>GST Return Filing</h1>
            <h2>Platform</h2>
            <p>for small companies</p>
          </div>
          
      </div>
    </div>
  )
}

export default Home