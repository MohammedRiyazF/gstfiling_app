import React from 'react'
import loadinggif from "../images/loading.gif"

const LoadingIcon = (props) => {
  const {title} = props
  return (
    <div className='bg-white flex-col sm:flex md:flex items-center w-full h-full'>
      <div className="w-full flex justify-center items-center h-full gap-5">
        <img src={loadinggif} width={50} alt="loading icon"/>
        <p className='text-center'>{title}</p>
      </div>  
    </div>
  )
}

export default LoadingIcon