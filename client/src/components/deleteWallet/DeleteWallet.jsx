import React, { useEffect, useState } from "react";
import RedirectsBack from "../redirects/RedirectsBack";

export default function DeleteWallet() {
  const [id_wallet, setIdWallet] = useState("");
  const [wallet, setsWallet] = useState([]);


  useEffect(()=>{
    const fetchData = async () => {
      try{
        const response = await fetch ('http://localhost:3000/query_wallet',{
          method:'GET',
          headers:{'Content-Type':'application/json'}
        }
      )

    if(!response.ok){
      throw new Error(`HTTP error stats: ${response.status}`)
    }
    const data = await response.json();
    console.log(data)
    setsWallet(data.resultQueryWallet)
      
          
      } catch (error) {
        console.error("Error al obtener las transacciones:", error);
      }
      }
      fetchData()
    },[])


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
                setIdWallet('')
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
{/*         <input
          type='number'
          autoComplete='off'
          name='id_wallet'
          placeholder='Billetera a eliminar'
          value={id_wallet}
          onChange={(e) => setIdWallet(e.target.value)}
        ></input> */}

        <select onChange={(e) => setIdWallet(e.target.value)}>
  {wallet.map((walletName, index) => (
    <option key={index} value={walletName.id_wallet}>
      {walletName.wallet_name.toUpperCase()}
    </option>
  ))}
</select>
         <button>Eliminar</button>
      </form>

      <RedirectsBack href={'/index'} text={'Inicio'}></RedirectsBack>
    </>
  );
}
