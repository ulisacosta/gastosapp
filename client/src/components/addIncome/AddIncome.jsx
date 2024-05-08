import React, { useState } from 'react'
import RedirectsBack from '../redirects/RedirectsBack';
export default function AddIncome() {
    const [amount,setAmount] = useState('')
    const [id_wallet,setWallet] = useState('')
    const [description,setDescription] = useState('')
    const handleSubmitAddIncome = async (e) => {
        e.preventDefault()
        const inputData = {id_wallet,amount,description}
        try{
            const response = await fetch(`http://localhost:3000/add_transaction/1`,{
            method:'POST',    
            headers:{
                'Content-Type':'application/json'    
            },
            body:JSON.stringify(inputData),
            credentials:'include'
            })
        const data = await response.json
        if(response.ok){
          
            setWallet('')
            setAmount('')
            setDescription('')
        }
        else{
            console.log('No se pudo completar el envío del formulario')
        }
        }
        catch(error){
            console.error('Error al enviar formulario',error)
        }
    }


  return (
    <>
        <h1>Agregar ingresos</h1>
        <form onSubmit={handleSubmitAddIncome}>
            <input type='number' autoComplete='off' name='id_wallet' placeholder='Agregar billetera' value={id_wallet} onChange={(e)=>setWallet(e.target.value)}></input>
            <input type='number' autoComplete='off' name='amount' placeholder='Agregar monto' value={amount} onChange={(e)=>setAmount(e.target.value)}></input>
            <input type='text' autoComplete='off' name='description' placeholder='Agregar descripción' value={description} onChange={(e)=>setDescription(e.target.value)}></input>
            <button>Agregar</button>
        </form>
        <RedirectsBack href={'/index'} text={'Volver'}></RedirectsBack>
    </>
  )
}
