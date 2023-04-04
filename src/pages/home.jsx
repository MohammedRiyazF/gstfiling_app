import React from 'react'

const Home = () => {
  return (
    <div className='home flex justify-center items-start bg-blue-400'>
      <div className='bg-blue-400 rounded-md mt-20 m-5 shadow-lg p-2'>
          <div className='flex justify-center items-center gap-2  shadow-lg shadow-gray-600 p-1 bg-white rounded '>
            <img src='/gsticon.jpeg' alt="gsticon" width={50} className="rounded-md" />
            <h1 className='text-green-400'><b>GSTSAFE</b></h1>
          </div>
          <div className='text-center space-y-[15px] flex-1 h-full py-10'>
            <h2>A Secure</h2>
            <h1 className='font-bold text-white'><span className="text-orange-400">GST</span> <span className="text-green-400">Return</span> Filing</h1>
            <h2>Platform</h2>
            <p>for small companies</p>
          </div>
          
      </div>
    </div>
  )
}

export default Home