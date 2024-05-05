import React, { useState } from 'react'
import RedirectsBack from '../redirects/RedirectsBack';

export default function Add_wallet() {
  const [wallet_name,setWallet_name] = useState('')

  

  const handleSubmitAddWallet = async (e) => {
    e.preventDefault();
    const inputData = {wallet_name}

    try{

      const response = await fetch('http://localhost:3000/add_wallet',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(inputData),
        credentials:'include'
      })
      const data = await response.json(); 
    
      if(response.ok){
        console.log(data.message)
        setWallet_name("");
      }
      else{
        console.log("No se pudo completar la carga")
      }
    
  
    } catch(error){
      console.error('Error al enviar el formulario',error)
    }
  }


  return (
    <div>
    <div>
      <h1>Agregar nueva billetera</h1>
    </div>
    <form onSubmit={handleSubmitAddWallet}>
        
        <input type='text' name='wallet_name' placeholder='Agregar billetera' autoComplete="off" value={wallet_name.charAt(0).toUpperCase()+ wallet_name.slice(1)} onChange={(e) => setWallet_name(e.target.value)}></input>
        <button>Agregar</button>
    </form>

    
    <RedirectsBack href={'/index'} text={'Volver'}></RedirectsBack>
    </div>
  )
}
