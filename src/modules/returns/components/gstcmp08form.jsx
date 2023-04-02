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
            <div className='flex justify-center items-start mt-10 flex-1'>
                <table className=' border-2 border-black'>
                    <tr className='bg-gray-400 text-white p-3 grid-row gap-10'>
                        <th>Sr.No.</th>
                        <th>Description</th>
                        <th>Value</th>
                        <th>Integrated tax</th>
                        <th>Central tax</th>
                        <th>State tax</th>
                        <th>Cess</th>
                    </tr>
                    {gstcmp08.map((row) =>
                        <tr>
                            <td>{row['Sr.No.']}</td>
                            <td>{row.Description}</td>
                            <td>{row.Value}</td>
                            <td>{row['Integrated tax']}</td>
                            <td>{row['Central tax']}</td>
                            <td>{row['State tax']}</td>
                        </tr>

                    )}
                </table>
            </div>
        </div>
    )
}

export default Gstcmp08form