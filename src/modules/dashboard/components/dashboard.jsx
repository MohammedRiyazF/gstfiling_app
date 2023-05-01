import React, { useState } from 'react'
import Returns from '../../returns'
import { gql, useLazyQuery, useQuery } from '@apollo/client';
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

const GET_RETURN_FILED_STATUS = gql`
query returnFiledStatus($GSTIN: String!, $financial_year : Int!, $quarter: Int! ) {
  returns_filed_status(where: {GSTIN: {_eq: $GSTIN}, financial_year: {_eq: $financial_year }, quarter: {_eq: $quarter}}) {
    filed_or_not
  }
}
`

const Dashboard = (props) => {
  const {id} = props
  const [show, setShow] = useState(false)
  const initial = {
    financial_year : null,
    quarter: null,
    period: ''
  }
  // eslint-disable-next-line
  const [yearDetail, setYearDetail] = useState(initial)

  const { data:firmData } = useQuery(FIRMDATA, {
    variables: {
        id: id
    },
    fetchPolicy: 'network-only'
  })

  const trader = get(firmData, 'composition_dealers[0]', null)

  const [getReturnFiledStatus, {loading:Loading, data:returnFiledStatus}] = useLazyQuery(GET_RETURN_FILED_STATUS,{
    fetchPolicy: 'network-only'})

  const filed_or_not = returnFiledStatus?.returns_filed_status[0]?.filed_or_not
  const handleClick =() => {
    var financial_year = document.getElementById('year_list').value
    var quarter = document.getElementById('quarter_list').value
    var period = document.getElementById('period_list').value
    setYearDetail({
      financial_year: financial_year,
      quarter: quarter,
      period: period
    })
    getReturnFiledStatus({
      variables : {
        GSTIN : trader?.GSTIN,
        financial_year : financial_year,
        quarter : quarter
      },
      onCompleted(data){
        setShow(true)
      }
    })
    
  }

  return (
    <main className=" flex m-10 bg-white rounded-md">
      <div className="w-full  p-5">
        <h2>File Returns</h2>
        <hr />
        <h3 className="flex justify-end">* Indicates Mandatory Fields</h3>
        <br />
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 align-middle" >
          <div>
            <label>Financial Year * </label>
            <input id="year_list" className="border-2 flex items-center" list="year" />
            <datalist id="year">
              <option value={2023}>2023</option>

            </datalist>
          </div>
          <div>
            <label>Ouarter * </label>
            <input id="quarter_list" className="border-2 flex items-center" list="quarter" />
            <datalist id="quarter">
              <option value={1}>Ouarter 1 (Apr - Jun)</option>
              <option value={2} >Quarter 2 (Jul - Sep)</option>
              <option value={3} >Quarter 3 (Oct - Dec)</option>
              <option value={4} >Quarter 4 (Jan - Mar)</option>
            </datalist>
          </div>
          <div>
            <label>Period * </label>
            <input id="period_list" className="border-2 flex items-center" list="period" />
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
              <option value='October' />
              <option value='November' />
              <option value='December' />
            </datalist>
          </div>
          <button className="bg-blue-600 p-1 my-2 text-white rounded-md w-full" onClick={handleClick} >Search</button>
        </section>
        <br/><hr/>
        {Loading ? <div><p>Loading...</p></div> : show ? filed_or_not ? 
            <div><p>Hurray, No returns to be filed!</p></div> : <Returns year_detail={yearDetail} filed_or_not={filed_or_not}/> : null
        }
      </div>
    </main>
  )
}

export default Dashboard