import React, {createContext} from 'react'
import Dashboard from '../../modules/dashboard/components/dashboard'
import { useParams } from 'react-router-dom';

export const UserContext = createContext();

const Index = () => {
  let { id } = useParams();

  return (
    <UserContext.Provider value={id}>
        <Dashboard id={id}/>
    </UserContext.Provider>
  )
}

export default Index