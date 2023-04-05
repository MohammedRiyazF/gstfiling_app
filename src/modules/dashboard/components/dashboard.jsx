import React, { useState } from 'react'
import Returns from '../../returns'
import { gql, useMutation, useQuery } from '@apollo/client';
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

const UPDATE_FIRM = gql`mutation UpdateFirm($GSTIN: String!, $Financial_Year: String!, $Quarter: String!) {
  update_return_filed(where: {GSTIN: {_eq: $GSTIN}}, _set: {Financial_Year: $Financial_Year, Quarter: $Quarter}) {
    affected_rows
  }
}`


const Dashboard = (props) => {
  const {id} = props
  const [show, setShow] = useState(false)
  const [updateFirm, {loading,data:updatedFirm, error }] = useMutation(UPDATE_FIRM, {
    onError(err) {
        alert(err.toString())
    }
  })

  const { data:firmData } = useQuery(FIRMDATA, {
    variables: {
        id: id
    }
  })
  const trader = get(firmData, 'composition_dealers[0]', null)

  const initial = {
    financial_year : '',
    quarter: '',
    period: ''
  }
  // eslint-disable-next-line
  const [yearDetail, setYearDetail] = useState(initial)
  const handleClick =() => {
    var financial_year = document.getElementById('year_list').value
    var quarter = document.getElementById('quarter_list').value
    var period = document.getElementById('period_list').value
    setYearDetail({
      financial_year: financial_year,
      quarter: quarter,
      period: period
    })
    updateFirm({
      variables : {
        GSTIN: trader?.GSTIN,
        Financial_Year: financial_year,
        Quarter: quarter
      }
    })
    setShow(!show)
    
    
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
              <option value="2021-22" />
              <option value="2022-23" />
              <option value="2023-24" />
            </datalist>
          </div>
          <div>
            <label>Ouarter * </label>
            <input id="quarter_list" className="border-2 flex items-center" list="quarter" />
            <datalist id="quarter">
              <option value="Ouarter 1 (Apr - Jun)" />
              <option value="Quarter 2 (Jul - Sep)" />
              <option value="Quarter 3 (Oct - Dec)" />
              <option value="Quarter 4 (Jan - Mar)" />
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
              <option value='August' />
              <option value='November' />
              <option value='December' />
            </datalist>
          </div>
          <button className="bg-blue-600 p-1 my-2 text-white rounded-md w-full" onClick={handleClick} >Search</button>
        </section>
        <br/><hr/>
        {show &&
            <Returns year_detail={yearDetail}/>
        }
      </div>
    </main>
  )
}

export default Dashboard