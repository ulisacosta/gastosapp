import React, { useState } from 'react'

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
      .then(response => response.json())
      .then(data => {
        console.log(data)
      });
    
    setWallet_name(''); 
  
    } catch(error){
      console.error('Error al enviar el formulario',error)
    }
  }


  return (
    <div>
    <form onSubmit={handleSubmitAddWallet}>
        
        <input type='text' name='wallet_name' placeholder='Agregar billetera' autoComplete="off" value={wallet_name.charAt(0).toUpperCase()+ wallet_name.slice(1)} onChange={(e) => setWallet_name(e.target.value)}></input>
        <button>Agregar</button>
    </form>
    </div>
  )
}
