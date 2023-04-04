import React from 'react'
import Returns from './components/returns'
import data from './components/mock.json'

const ReturnIndex = (props) => {
  const {year_detail} = props
  const data2 = data.data
  return (
    <div className='gap-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
      {data2.map((item) =>
        item.isFiled ? null : <Returns year_detail={year_detail} title={item.title} name={item.name}/>
      )}
    </div>
  )
}

export default ReturnIndex