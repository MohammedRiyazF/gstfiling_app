import React from 'react'
import Dashboard from '../../modules/dashboard/components/dashboard'
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

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

const Index = () => {
  let { id } = useParams();
  const {data} = useQuery(FIRMDATA, {
    variables: {
        id : id
    }
  })
  console.log(data)
  return (
    <Dashboard id={id} data={data}/>
  )
}

export default Index