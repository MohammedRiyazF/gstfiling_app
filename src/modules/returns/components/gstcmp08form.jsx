import React from 'react'
import { useParams } from 'react-router-dom'
import jsonData from './mock.json'
import { gql, useQuery } from '@apollo/client'
import get from 'lodash/get'

const FIRMDATA = gql`query credentials($id: Int!) {
    composition_dealers(where: {id: {_eq: $id}}) {
      id
      GSTIN
      Legal_Name
      Trade_Name
      Address
      Financial_Year
      Category
      Place
    }
  }
  `

const Gstcmp08form = () => {
    let {id} = useParams()
    const {data} = useQuery(FIRMDATA, {
        variables: {
            id : id
        }
      })
    const trader = get(data,'composition_dealers[0]',null)
    const tableBorder = 'border-2 border-black px-2 text-center'
    const gstcmp08 = jsonData.gstcmp08
    return (
        <div className='flex flex-col bg-white w-full h-[85vh] align-middle'>
            <div className='border-2 p-2'>
                <section className="md:flex justify-evenly">
                    <h5>{trader?.GSTIN}</h5>
                    <h5><b>Legal Name :</b>{trader?.Legal_Name}</h5>
                    <h5><b>Trade Name :</b>{trader?.Trade_Name}</h5>
                    <h5><b>Financial Year :</b> 2021-22</h5>
                    <h5><b>Period :</b>Oct-Dec</h5>
                    <h5><b>Status :</b> Not Filed</h5>
                </section>
            </div>
            {/* <div className='flex justify-center items-start mt-10 flex-1 overflow-x-auto'>
                <table className={`${tableBorder} border-collapse h-3/4`}>
                    <tr className='bg-gray-400 text-white p-3 grid-row gap-10'>
                        <th className={tableBorder}>Sr.No.</th>
                        <th className={tableBorder}>Description</th>
                        <th className={tableBorder}>Value</th>
                        <th className={tableBorder}>Integrated tax</th>
                        <th className={tableBorder}>Central tax</th>
                        <th className={tableBorder}>State tax</th>
                        <th className={tableBorder}>Cess</th>
                    </tr>
                    {gstcmp08.map((row) =>
                        <tr>
                            <td className={tableBorder}>{row['Sr.No.']}</td>
                            <td className={`${tableBorder} w-1/4`}>{row.Description}</td>
                            <td className={tableBorder}>{row.Value}</td>
                            <td className={tableBorder}>{row['Integrated tax']}</td>
                            <td className={tableBorder}>{row['Central tax']}</td>
                            <td className={tableBorder}>{row['State tax']}</td>
                        </tr>

                    )}
                </table>
            </div> */}
            <div className='bg-green-200 w-full flex-col grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 p-3 gap-2'>
                <section className='bg-blue-200 flex-1 rounded-md p-1'>
                    <h4>Outwards Supplies(including exempt supplies)</h4>
                    <div className='flex  justify-between p-1'>
                        <label>Value</label>
                        <input type="text" />
                    </div>
                    <div className='flex  justify-between p-1'>
                        <label>Integrated tax</label>
                        <input type="text" />
                    </div>
                    <div className='flex  justify-between p-1'>
                        <label>Central tax</label>
                        <input type="text" />
                    </div>
                    <div className='flex  justify-between p-1' >
                        <label>State tax</label>
                        <input type="text" disabled/>
                    </div>
                </section>
                
            </div>
        </div>
    )
}

export default Gstcmp08form