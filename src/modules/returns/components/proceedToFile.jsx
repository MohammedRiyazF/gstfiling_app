import { gql , useMutation} from '@apollo/client'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingIcon from '../../../components/loadingIcon'

const FILE_RETURN = gql`mutation fileGstReturn($GSTIN: String!, $legal_name: String!, $financial_year: Int!, $quarter: Int!, $tax_detail_json: json!, $total_tax_value: Int!, $total_integrated_tax: Int!, $total_central_tax: Int!, $total_state_tax: Int!, $total_cess: Int!) {
  insert_gst_return_one(object: {GSTIN: $GSTIN, legal_name: $legal_name, financial_year: $financial_year, quarter: $quarter, tax_details_json: $tax_detail_json, total_tax_value: $total_tax_value, total_integrated_tax: $total_integrated_tax, total_central_tax: $total_central_tax, total_state_tax: $total_state_tax, total_cess: $total_cess}, on_conflict: {constraint: gst_return_GSTIN_key}) {
    GSTIN
  }
}
`

const  UPDATE_RETURN_FILED_STATUS = gql`mutation updateReturnFiledStatus($GSTIN: String, $financial_year: Int!, $quarter: Int!, $date_of_filing: date!, $arn: Int!) {
  update_returns_filed_status(where: {GSTIN: {_eq: $GSTIN}, financial_year: {_eq: $financial_year}, quarter: {_eq: $quarter}}, _set: {filed_or_not: true, date_of_filing: $date_of_filing, arn: $arn}) {
    affected_rows
  }
}
`

const ProceedToFile = (props) => {
  const navigate = useNavigate()
  const {tableData, gstin, Legal_Name, financial_year, quarter} = props

  var today = new Date();
  var arn = Math.floor((Math.random() * 10000) + 1);
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  const tax_payable = tableData[2]?.supplies_value
  const integrated_tax = tableData[2]?.supplies_integrated_tax + tableData[3]?.supplies_integrated_tax
  const central_tax = tableData[2]?.supplies_central_tax + tableData[3]?.supplies_central_tax
  const state_tax = tableData[2]?.supplies_state_tax + tableData[3]?.supplies_state_tax
  const cess =   tableData[2]?.supplies_value + tableData[3]?.supplies_cess
  const handleClick = () => {
    fileReturn({
      variables : {
      GSTIN: gstin,
      legal_name: Legal_Name,
      financial_year: financial_year,
      quarter: quarter,
      tax_detail_json : {tableData},
      total_tax_value: tax_payable,
      total_integrated_tax: integrated_tax,
      total_central_tax: central_tax,
      total_state_tax: state_tax,
      total_cess: cess,
    }})

    updateReturnFiledStatus({
      variables : {
        GSTIN: gstin,
        financial_year: financial_year,
        quarter: quarter,
        date_of_filing: date,
        arn: arn
      }
    })
  }

  const [fileReturn, {loading, data, error}] = useMutation(FILE_RETURN, {
    onCompleted(data) {
      alert('Successfully Filed')
    },
    onError(error) {
        alert(error.toString())
    }
  })

  const [ updateReturnFiledStatus, {loading:Loading, data:filed_status_data, error:Error}] = useMutation(UPDATE_RETURN_FILED_STATUS, {
    onError(error) {
        alert(error.toString())
    }
  })


  const tableBorder = "border-2 border-black"
  return (
    <div className='bg-white w-full h-[85vh] '>
      {(loading || Loading) ? <LoadingIcon title="Filing..." /> :
      <>
        <div className="w-full h-20 bg-blue-400 text-white flex justify-start pl-10 items-center">
          Summary: 
        </div>
        <div className='flex justify-center items-start mt-10 flex-1 overflow-x-auto'>
                <table className={`${tableBorder} border-collapse h-3/4`}>
                  <tbody>
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
                        <tr key={tableData?.id}>
                            <td className={tableBorder}>{row?.id}</td>
                            <td className={`${tableBorder} w-1/4`}>{row?.title}</td>
                            <td className={tableBorder}>{row?.supplies_value}</td>
                            <td className={tableBorder}>{row?.supplies_integrated_tax}</td>
                            <td className={tableBorder}>{row?.supplies_central_tax}</td>
                            <td className={tableBorder}>{row?.supplies_state_tax}</td>
                            <td className={tableBorder}>{row?.supplies_cess}</td>
                        </tr>

                    )}
                  </tbody>
                </table>
          </div>
        <div className="flex justify-center">
          <button className="bg-blue-400 p-3 m-4 rounded-md " onClick={handleClick}>File the Return</button>
        </div>
      </>}
    </div>
  )
}

export default ProceedToFile