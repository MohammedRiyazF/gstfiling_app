import { gql , useMutation} from '@apollo/client'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const FILE_RETURN = gql`mutation fileReturn($GSTIN: String!,$Legal_Name: String!,$Tax_payable: Int!, $Integrated_tax: Int!, $Central_tax: Int!, $State_tax: Int!, $Cess: Int!, $Date: date! ) {
  insert_returns(objects: {GSTIN: $GSTIN, Legal_Name: $Legal_Name, Tax_payable: $Tax_payable, Integrated_tax: $Integrated_tax, Central_tax: $Central_tax, State_tax: $State_tax, Cess: $Cess, Date_of_Filing: $Date}) {
    affected_rows
  }
}`

const FILED_OR_NOT = gql`mutation UPDATE_RETURN_FILED_DATA($GSTIN: String!) {
  update_return_filed(where: {GSTIN: {_eq: $GSTIN}, Filed_or_Not: {}}, _set: {Filed_or_Not: true}) {
    affected_rows
  }
}
`

const ProceedToFile = (props) => {
  const navigate = useNavigate()
  const {tableData, gstin, Legal_Name} = props

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  const tax_payable = tableData[2]?.supplies_value
  const integrated_tax = tableData[2]?.supplies_integrated_tax + tableData[3]?.supplies_integrated_tax
  const central_tax = tableData[2]?.supplies_central_tax + tableData[3]?.supplies_central_tax
  const state_tax = tableData[2]?.supplies_state_tax + tableData[3]?.supplies_state_tax
  const cess =  tableData[1]?.supplies_cess + tableData[3]?.supplies_cess
  const handleClick = () => {
    fileReturn({
      variables : {
      GSTIN: gstin,
      Legal_Name: Legal_Name,
      Tax_payable: tax_payable,
      Integrated_tax: integrated_tax,
      Central_tax: central_tax,
      State_tax: state_tax,
      Cess: cess,
      Date: date
    }})

    filedOrNot({
      variables : {
        GSTIN: gstin
      }
    })
  }

  const [fileReturn, {loading, data, error}] = useMutation(FILE_RETURN, {
    onError(error) {
        alert(error.toString())
    }
  })

  const [filedOrNot, {loading:Loading, data:filed_status_data, error:Error}] = useMutation(FILED_OR_NOT, {
    onError(error) {
        alert(error.toString())
    }
  })

  if (loading || Loading) return <div className='bg-white flex justify-center items-center'>Filing...Please Wait</div>

  const tableBorder = "border-2 border-black"
  return (
    <div className='bg-white w-full h-[85vh] '>
        <div className="w-full h-20 bg-blue-400 text-white flex justify-start pl-10 items-center">
          Summary: 
        </div>
        <div className='flex justify-center items-start mt-10 flex-1 overflow-x-auto'>
                <table className={`${tableBorder} border-collapse h-3/4`}>
                    <tr className='bg-gray-400 text-white p-3 grid-row gap-10'>
                        <th >Sr.No.</th>
                        <th className={tableBorder}>Description</th>
                        <th className={tableBorder}>Value</th>
                        <th className={tableBorder}>Integrated tax</th>
                        <th className={tableBorder}>Central tax</th>
                        <th className={tableBorder}>State tax</th>
                        <th className={tableBorder}>Cess</th>
                    </tr>
                    {tableData.map((row) =>
                        <tr>
                            <td className={tableBorder}>{row?.id}</td>
                            <td className={`${tableBorder} w-1/4`}>{row?.title}</td>
                            <td className={tableBorder}>{row?.supplies_value}</td>
                            <td className={tableBorder}>{row?.supplies_integrated_tax}</td>
                            <td className={tableBorder}>{row?.supplies_central_tax}</td>
                            <td className={tableBorder}>{row?.supplies_state_tax}</td>
                            <td className={tableBorder}>{row?.supplies_cess}</td>
                        </tr>

                    )}
                </table>
          </div>
        <div className="flex justify-center">
          <button className="bg-blue-400 p-3 m-4 rounded-md " onClick={handleClick}>File the Return</button>
        </div>
    </div>
  )
}

export default ProceedToFile