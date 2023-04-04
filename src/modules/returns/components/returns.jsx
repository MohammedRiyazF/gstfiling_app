import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../pages/dashboard';

const Returns = (props) => {
    const id = useContext(UserContext); 
    const {title,name} = props
    const navigate = useNavigate()
    const handleClick = (name) => {
        name === 'GST CMP-08' ? navigate(`/returns/gst_cmp_08/index/${id}`) : navigate('/returns/gstr4/index')
    }
    return (
        <div className='bg-blue-300 w-full rounded-md mt-5'>
            <section className='text-center bg-blue-600 text-white font-light p-2 rounded-md h-4/6 flex-1' >
                <h4>{title}</h4>
                <h5>{name}</h5>
            </section>
            <section className='flex justify-center p-2'>
                <button
                    className='p-1 rounded-md bg-blue-600 text-white'
                    onClick={() => handleClick(name)}
                >
                    Prepare Online
                </button>
            </section>
        </div>
    )
}

export default Returns