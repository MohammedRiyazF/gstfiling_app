import React, { useState } from 'react'
import Returns from '../../returns'


const Dashboard = (props) => {
  const {id} = props
  const [show, setShow] = useState(false)
  const handleClick =() => {
    setShow(!show)
  }
  return (
    <main className="h-[50vh] flex m-20 bg-white rounded-md">
      <div className="w-full  p-2">
        <h2>File Returns</h2>
        <hr />
        <h3 className="flex justify-end">* Indicates Mandatory Fields</h3>
        <br />
        <section className="flex justify-evenly items-end">
          <div>
            <label>Financial Year * </label>
            <input className="border-2 flex items-center" list="year" />
            <datalist id="year">
              <option value="2021-22" />
              <option value="2022-23" />
              <option value="2023-24" />
            </datalist>
          </div>
          <div>
            <label>Ouarter * </label>
            <input className="border-2 flex items-center" list="quarter" />
            <datalist id="quarter">
              <option value="Ouarter 1 (Apr - Jun)" />
              <option value="Quarter 2 (Jul - Sep)" />
              <option value="Quarter 3 (Oct - Dec)" />
              <option value="Quarter 4 (Jan - Mar)" />
            </datalist>
          </div>
          <div>
            <label>Period * </label>
            <input className="border-2 flex items-center" list="period" />
            <datalist id="period" >
              <option value='January' />
              <option value='February' />
              <option value='March' />
              <option value='April' />
              <option value='May' />
              <option value='June' />
              <option value='July' />
              <option value='August' />
              <option value='September' />
              <option value='August' />
              <option value='November' />
              <option value='December' />
            </datalist>
          </div>
          <button className="bg-blue-600 p-1 text-white rounded-md w-1/4" onClick={handleClick} >Search</button>
        </section>
        <br/><hr/>
        {show &&
          <div>
            <Returns />
          </div>
        }
      </div>
    </main>
  )
}

export default Dashboard