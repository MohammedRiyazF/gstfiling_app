import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingIcon from '../../../components/loadingIcon'
import Overlay from '../../../components/overlay'

const FILE_RETURN = gql`mutation fileGstReturn($GSTIN: String!, $legal_name: String!, $financial_year: Int!, $quarter: Int!, $tax_detail_json: json!, $total_tax_value: Int!, $total_integrated_tax: Int!, $total_central_tax: Int!, $total_state_tax: Int!, $total_cess: Int!) {
  insert_gst_return_one(object: {GSTIN: $GSTIN, legal_name: $legal_name, financial_year: $financial_year, quarter: $quarter, tax_details_json: $tax_detail_json, total_tax_value: $total_tax_value, total_integrated_tax: $total_integrated_tax, total_central_tax: $total_central_tax, total_state_tax: $total_state_tax, total_cess: $total_cess}, on_conflict: {constraint: gst_return_GSTIN_key}) {
    GSTIN
  }
}
`

const UPDATE_RETURN_FILED_STATUS = gql`mutation updateReturnFiledStatus($GSTIN: String, $financial_year: Int!, $quarter: Int!, $date_of_filing: date!, $arn: Int!) {
  update_returns_filed_status(where: {GSTIN: {_eq: $GSTIN}, financial_year: {_eq: $financial_year}, quarter: {_eq: $quarter}}, _set: {filed_or_not: true, date_of_filing: $date_of_filing, arn: $arn}) {
    affected_rows
  }
}
`

const createDocument = async (financial_year, quarter, arn, date, tableData, trader) => {
  const id_to_fetch = await fetch(`https://api.pdfmonkey.io/api/v1/documents`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer pv4E_sveJcGQJ92Evrjz'
    },
    body: JSON.stringify({
      "document_template_id": "F50A2F64-FF59-4B9A-AF48-8A3D9D9D2D3C",
      "payload": {
        "financial_year": financial_year,
        "quarter": quarter,
        "gstin": trader?.GSTIN,
        "legal_name": trader?.Legal_Name,
        "trade_name": trader?.Trade_Name,
        "arn": arn,
        "date_of_filing": date,
        "outward_supplies_value": tableData[0].supplies_value,
        "outward_supplies_integrated_tax": tableData[0].supplies_integrated_tax,
        "outward_supplies_central_tax": tableData[0].supplies_central_tax,
        "outward_supplies_state_tax": tableData[0].supplies_state_tax,
        "outward_supplies_cess": tableData[0].supplies_cess,
        "inward_supplies_value": tableData[1].supplies_value,
        "inward_supplies_integrated_tax": tableData[1].supplies_integrated_tax,
        "inward_supplies_central_tax": tableData[1].supplies_central_tax,
        "inward_supplies_state_tax": tableData[1].supplies_state_tax,
        "inward_supplies_cess": tableData[1].supplies_cess,
        "tax_payable_value": tableData[2].supplies_value,
        "tax_payable_integrated_tax": tableData[2].supplies_integrated_tax,
        "tax_payable_central_tax": tableData[2].supplies_central_tax,
        "tax_payable_state_tax": tableData[2].supplies_state_tax,
        "tax_payable_cess": tableData[2].supplies_cess,
        "interest_supplies_value": tableData[3].supplies_value,
        "interest_supplies_integrated_tax": tableData[3].supplies_integrated_tax,
        "interest_supplies_central_tax": tableData[3].supplies_central_tax,
        "interest_supplies_state_tax": tableData[3].supplies_state_tax,
        "interest_supplies_cess": tableData[3].supplies_cess,
        "total_tax_value": tableData[2].supplies_value,
        "total_tax_integrated_tax": tableData[2].supplies_integrated_tax + tableData[3].supplies_integrated_tax,
        "total_tax_central_tax": tableData[2].supplies_central_tax + tableData[3].supplies_central_tax,
        "total_tax_state_tax": tableData[2].supplies_state_tax + tableData[3].supplies_state_tax,
        "total_tax_cess": tableData[2].supplies_cess + tableData[3].supplies_cess,
        "signature": trader?.Owner_name,
        "name": trader?.Owner_name,
        "designation": trader?.Designation,
        "place": trader?.Place
      },
      "meta": JSON.stringify({
        "_filename": `GSTIN${trader?.GSTIN}.pdf`
      }),
      "status": "pending"
    })
  }).then(response => response.json())
    .then((data) => { return data?.document?.id })

  window.value = id_to_fetch
}

const ProceedToFile = (props) => {
  const navigate = useNavigate()
  const { tableData, trader, financial_year, quarter } = props
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(false)

  var today = new Date();
  var arn = Math.floor((Math.random() * 10000) + 1);
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  const tax_payable = tableData[2]?.supplies_value
  const integrated_tax = tableData[2]?.supplies_integrated_tax + tableData[3]?.supplies_integrated_tax
  const central_tax = tableData[2]?.supplies_central_tax + tableData[3]?.supplies_central_tax
  const state_tax = tableData[2]?.supplies_state_tax + tableData[3]?.supplies_state_tax
  const cess = tableData[2]?.supplies_value + tableData[3]?.supplies_cess

  const handleClick = () => {
    createDocument(financial_year, quarter, arn, date, tableData, trader)
    fileReturn({
      variables: {
        GSTIN: trader?.GSTIN,
        legal_name: trader?.Legal_Name,
        financial_year: financial_year,
        quarter: quarter,
        tax_detail_json: { tableData },
        total_tax_value: tax_payable,
        total_integrated_tax: integrated_tax,
        total_central_tax: central_tax,
        total_state_tax: state_tax,
        total_cess: cess,
      }
    })

    updateReturnFiledStatus({
      variables: {
        GSTIN: trader?.GSTIN,
        financial_year: financial_year,
        quarter: quarter,
        date_of_filing: date,
        arn: arn
      }
    })

  }

  const [fileReturn, { loading, data:file_return, error }] = useMutation(FILE_RETURN, {
    onCompleted(data) {
      setIsOpen(!isOpen)
    },
    onError(error) {
      alert(error.toString())
    }
  })

  const [updateReturnFiledStatus, { loading: Loading, data: filed_status_data, error: Error }] = useMutation(UPDATE_RETURN_FILED_STATUS, {
    onError(error) {
      alert(error.toString())
    }
  })

  const HandleDownload = async (value) => {
      setLoading(!isLoading)
      await fetch(`https://api.pdfmonkey.io/api/v1/documents/${window.value}`, {
        method : 'GET',
        headers : {
          'Authorization' : 'Bearer pv4E_sveJcGQJ92Evrjz'
        },
        "status" : "success"
    }).then(response1 =>  response1.json())
    . then(data => {
      setLoading(false)
      window.location.href = (value == 'preview') ? data?.document?.preview_url :  data?.document?.download_url
    })
  }

  const tableBorder = "border-2 border-black"
  return (
    <div className='bg-white w-full h-[85vh] '>
      {(loading || Loading || isLoading ) ? <LoadingIcon title={isLoading ? "Loading" : "Filing..."} /> :
        <>
          <div className="w-full h-20 bg-blue-400 text-white flex justify-start pl-10 items-center">
            Summary:
          </div>
          <div className='flex justify-center items-start mt-10 flex-1 overflow-x-scroll pl-20'>
            <table className={`${tableBorder} border-collapse h-3/4 p-10`}>
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
                  <tr key={row?.id}>
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
            <button className="bg-blue-400 p-3 m-4 rounded-md " onClick={() => HandleDownload('download')} disabled={file_return? false: true}>Download the Return</button>
            <button className="bg-blue-400 p-3 m-4 rounded-md " onClick={() => HandleDownload('preview')} disabled={file_return? false: true}>Preview the file</button>

            <Overlay isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
              <h5>Return Filed Successfully !</h5>
            </Overlay>
          </div>
        </>}
    </div>
  )
}

export default ProceedToFile