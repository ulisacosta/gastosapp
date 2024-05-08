import React, { useState } from "react";
import RedirectsBack from "../redirects/RedirectsBack";

export default function DeleteWallet() {
  const [id_wallet, setWallet] = useState("");
  
  const handleSubmitDeleteWallet = async (e) => {
      e.preventDefault()
      const inputData = {id_wallet}

        try{
            const response = await fetch('http://localhost:3000/delete_wallet',{
                method:'DELETE',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(inputData),
                credentials:'include'
            })
            const data = await response.json
            if(response.ok){
                setWallet('')
            }
            else{
                console.log('No se pudo completar el envío de formulario')
            }
        }
        catch(error){
            console.error('Error en el servidor')
        }
    }
  return (
    <>
      <h1>Eliminar billetera</h1>
      <form onSubmit={handleSubmitDeleteWallet}>
        <input
          type='number'
          autoComplete='off'
          name='id_wallet'
          placeholder='Billetera a eliminar'
          value={id_wallet}
          onChange={(e) => setWallet(e.target.value)}
        ></input>
         <button>Eliminar</button>
      </form>

      <RedirectsBack href={'/index'} text={'Inicio'}></RedirectsBack>
    </>
  );
}
