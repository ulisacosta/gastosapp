import React from 'react'
import { useNavigate } from 'react-router-dom'
import {fetchLogout} from '../../service/login/logout'
import { Button } from 'rsuite'
export default function Logout() {
    const navigate = useNavigate()
    const onClickLogout = () =>{
        fetchLogout().then((response)=>{
       
            if(response.ok){
                localStorage.removeItem('token')
                navigate('/login')
            }
        })
    }
  return (
    <Button onClick={onClickLogout} className=' text-red-500 '>Cerrar Sesión</Button>
  )
}
