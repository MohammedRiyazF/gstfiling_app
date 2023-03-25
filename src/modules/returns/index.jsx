import React from 'react'
import Returns from './components/returns'
import data from './components/mock.json'

const ReturnIndex = () => {
    const data2 = data.data
  return (
    <div className='flex h-full gap-2'>
    {data2.map((item) => 
        item.isFiled ? null : <Returns title={item.title} name={item.name} /> 
    )}
    </div>
  )
}

export default ReturnIndex