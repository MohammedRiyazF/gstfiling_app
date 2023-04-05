import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import get from 'lodash/get'
import data2 from './mock.json'
import ProceedToFile from './proceedToFile'

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

const GET_RETURN_FILED_DATA = gql`
query getReturnFiledData($GSTIN: String!) {
  return_filed(where: {GSTIN: {_eq: $GSTIN}}) {
    Filed_or_Not
  }
}`


const Gstcmp08form = () => {
    const [proceedToFile, setProceedToFile] = useState(false)
    const { state } = useLocation();
    let { id } = useParams()
    const { data:firmData } = useQuery(FIRMDATA, {
        variables: {
            id: id
        }
    })
    const trader = get(firmData, 'composition_dealers[0]', null)

    const { data:returnData } = useQuery(GET_RETURN_FILED_DATA, {
        variables: {
            GSTIN: trader?.GSTIN
        }
    })
    const returns_firm = get(returnData, 'return_filed[0]', null)
    const gst_cmp_08 = data2.gstcmp08

    const handleSubmit = (event) => {
        setProceedToFile(true)
        event.preventDefault()
        var outward_supplies_value = document.getElementById('value1').value
        var inward_supplies_value = document.getElementById('value2').value
        console.log(outward_supplies_value, inward_supplies_value)
    }

    const handleVerify = () => {
        var outward_supplies_value = parseInt(document.getElementById('value1').value)
        var outward_supplies_central_tax = parseInt(document.getElementById('central_tax1').value)
        var outward_supplies_state_tax = parseInt(document.getElementById('state_tax1').value)

        var inward_supplies_value = parseInt(document.getElementById('value2').value)
        var inward_supplies_integrated_tax = parseInt(document.getElementById('integrated_tax2').value)
        var inward_supplies_central_tax = parseInt(document.getElementById('central_tax2').value)
        var inward_supplies_state_tax = parseInt(document.getElementById('state_tax2').value)
        var inward_supplies_cess = parseInt(document.getElementById('cess2').value)

        var interest_integrated_tax = parseInt(document.getElementById('integrated_tax4').value)
        var interest_central_tax = parseInt(document.getElementById('central_tax4').value)
        var interest_state_tax = parseInt(document.getElementById('state_tax4').value)
        var interest_cess = parseInt(document.getElementById('cess4').value)

        document.getElementById('value3').value = outward_supplies_value + inward_supplies_value
        document.getElementById('integrated_tax3').value = inward_supplies_integrated_tax
        document.getElementById('central_tax3').value = outward_supplies_central_tax + inward_supplies_central_tax
        document.getElementById('state_tax3').value = outward_supplies_state_tax + inward_supplies_state_tax
        document.getElementById('cess3').value = inward_supplies_cess


    }
    return (
    <>
    {!proceedToFile ?
        <div className='flex flex-col bg-white w-full h-[85vh] align-middle'>
            <div className='border-2 p-2'>
                <section className="md:flex justify-evenly">
                    <h5>{trader?.GSTIN}</h5>
                    <h5><b>Legal Name :</b>{trader?.Legal_Name}</h5>
                    <h5><b>Trade Name :</b>{trader?.Trade_Name}</h5>
                    <h5><b>Financial Year :</b>{state?.financial_year}</h5>
                    <h5><b>Period :</b>{state?.quarter}</h5>
                    <h5><b>Status :</b>{returns_firm?.Filed_or_Not ? 'Filed' : 'Not Filed'}</h5>
                </section>
            </div>
            <div className="bg-green-200 h-full overflow-x-scroll">
                <form className=' w-full h-full flex-col grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 p-3 pb-3 gap-2' onSubmit={handleSubmit}>
                    {gst_cmp_08.map((row) =>
                        <section key={row['Sr.No.']} className='flex-col bg-blue-200 flex-1 rounded-md p-1 my-2'>
                            <h4 className='font-semibold'>{row?.Description}</h4>
                            <div>
                                <div className='flex justify-between p-1'>
                                    <label>Value</label>
                                    {row?.Description === "Tax payable" || row?.Description === "Interest payable, if any" ? <input id={row?.Value} type="text" disabled /> :
                                        <input id={row?.Value} type="text" />}
                                </div>
                                <div className='flex  justify-between p-1'>
                                    <label>Integrated tax</label>
                                    {row?.Integrated_tax === "integrated_tax1" || row?.Description === "Tax payable" ? <input id={row?.Integrated_tax} type="text" disabled /> :
                                        <input id={row?.Integrated_tax} type="text" />}
                                </div>
                                <div className='flex  justify-between p-1'>
                                    <label>Central tax</label>
                                    {row?.Description === "Tax payable" ? <input id={row?.Central_tax} type="text" disabled /> :
                                        <input id={row?.Central_tax} type="text" />}
                                </div>
                                <div className='flex  justify-between p-1' >
                                    <label>State tax</label>
                                    {row?.Description === "Tax payable" ? <input id={row?.State_tax} type="text" disabled /> :
                                        <input id={row?.State_tax} type="text" />}
                                </div>
                                <div className='flex  justify-between p-1' >
                                    <label>Cess</label>
                                    {row?.Integrated_tax === "integrated_tax1" || row?.Description === "Tax payable" ?
                                        <input id={row?.Cess} type="text" disabled /> : <input id={row?.Cess} type="text" />}
                                </div>
                            </div>
                        </section>
                    )}
                </form>
            </div>
            <div className="flex justify-center  items-center gap-2 p-2">
                <button className=' w-1/4 bg-blue-600 text-white font-semibold p-2 rounded-md' onClick={handleVerify}>Verify</button>
                <input type='submit' value="Proceed to File" className='w-2/4 bg-blue-600 text-white font-semibold p-2 rounded-md' onClick={handleSubmit} />
            </div>
        </div> :
        <ProceedToFile /> }
    </>
    )
}

export default Gstcmp08form