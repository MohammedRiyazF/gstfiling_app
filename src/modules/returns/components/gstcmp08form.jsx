import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import get from 'lodash/get'
import data2 from './mock.json'
import ProceedToFile from './proceedToFile'
import LoadingIcon from '../../../components/loadingIcon'

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
      Owner_name
      Designation
    }
  }
  `

const GET_RETURN_FILED_STATUS = gql`
query getReturnsFiledStatus($GSTIN: String!, $financial_year: Int!, $quarter: Int!) {
    returns_filed_status(where: {GSTIN: {_eq: $GSTIN}, financial_year: {_eq: $financial_year}, quarter: {_eq: $quarter}}) {
      financial_year
      quarter
      filed_or_not
    }
  }`


const Gstcmp08form = () => {
    const [proceedToFile, setProceedToFile] = useState(false)
    const [isDisabled, setDisabled] = useState(true)
    const [tableData, setTableData] = useState([])
    const { state } = useLocation();
    let { id } = useParams()
    const { loading: loadingFirmData, data: firmData } = useQuery(FIRMDATA, {
        variables: {
            id: id
        }
    })
    const trader = get(firmData, 'composition_dealers[0]', null)

    const { loading: loadingFiledData, data: returnsFiledStatusData } = useQuery(GET_RETURN_FILED_STATUS, {
        variables: {
            GSTIN: trader?.GSTIN,
            financial_year: parseInt(state?.financial_year),
            quarter: parseInt(state?.quarter)
        },
        skip : !trader?.GSTIN
    })
    const returns_firm = get(returnsFiledStatusData, 'return_filed[0]', null)
    const gst_cmp_08 = data2.gstcmp08

    const handleSubmit = (event) => {
        setProceedToFile(true)
        event.preventDefault()
    }

    const handleVerify = () => {
        setDisabled(false)
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

        var tax_payable_value = outward_supplies_value + inward_supplies_value
        var tax_payable_integrated_tax = inward_supplies_integrated_tax
        var tax_payable_central_tax = outward_supplies_central_tax + inward_supplies_central_tax
        var tax_payable_state_tax = outward_supplies_state_tax + inward_supplies_state_tax
        var tax_payable_cess = inward_supplies_cess

        document.getElementById('value3').value = tax_payable_value
        document.getElementById('integrated_tax3').value = tax_payable_integrated_tax
        document.getElementById('central_tax3').value = tax_payable_central_tax
        document.getElementById('state_tax3').value = tax_payable_state_tax
        document.getElementById('cess3').value = tax_payable_cess

        setTableData([{
            id: 1,
            title: "Outward Supplies (including exempt supplies)",
            supplies_value: outward_supplies_value,
            supplies_integrated_tax: null,
            supplies_central_tax: outward_supplies_central_tax,
            supplies_state_tax: outward_supplies_state_tax,
            supplies_cess: null
        }, {
            id: 2,
            title: "Inward Supplies attracting reverse charge including import of services",
            supplies_value: inward_supplies_value,
            supplies_integrated_tax: inward_supplies_integrated_tax,
            supplies_central_tax: inward_supplies_central_tax,
            supplies_state_tax: inward_supplies_state_tax,
            supplies_cess: inward_supplies_cess,
        }, {
            id: 3,
            title: "Tax payable",
            supplies_value: tax_payable_value,
            supplies_integrated_tax: tax_payable_integrated_tax,
            supplies_central_tax: tax_payable_central_tax,
            supplies_state_tax: tax_payable_state_tax,
            supplies_cess: tax_payable_cess
        }, {
            id: 4,
            title: "Interest payable, if any",
            supplies_value: null,
            supplies_integrated_tax: interest_integrated_tax,
            supplies_central_tax: interest_central_tax,
            supplies_state_tax: interest_state_tax,
            supplies_cess: interest_cess,
        }])

    }
    return (
        <>
            {!proceedToFile ?
                <div className='flex flex-col bg-white w-full h-[85vh] align-middle'>
                    {(loadingFiledData || loadingFirmData) ?
                        <LoadingIcon title="Loading..." /> :
                        <>
                            <div className='border-2 p-2'>
                                <section className="md:flex justify-evenly">
                                    <h5>{trader?.GSTIN}</h5>
                                    <h5><b>Legal Name :</b>{trader?.Legal_Name}</h5>
                                    <h5><b>Trade Name :</b>{trader?.Trade_Name}</h5>
                                    <h5><b>Financial Year :</b>{state?.financial_year}</h5>
                                    <h5><b>Period :</b>{state?.quarter}</h5>
                                    <h5><b>Status :</b>{returns_firm?.filed_or_not ? 'Filed' : 'Not Filed'}</h5>
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
                                <input type='submit' value="Proceed to File" className={`w-2/4 ${isDisabled ? `bg-gray-400` : `bg-blue-600` } text-white font-semibold p-2 rounded-md`} onClick={handleSubmit} disabled={isDisabled}/>
                            </div>
                        </>}
                </div> :
                <ProceedToFile 
                    trader={trader}
                    financial_year={state?.financial_year}
                    quarter={state?.quarter} 
                    tableData={tableData} 
                />}
        </>
    )
}

export default Gstcmp08form