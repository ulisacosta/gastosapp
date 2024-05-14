import React, { useState } from "react";
import Button from "../redirects/Button";

import TextField from "@mui/material/TextField";
import { Toaster, toast } from 'sonner'

export default function Add_wallet() {
  const [wallet_name, setWallet_name] = useState("");
  
  const handleSubmitAddWallet = async (e) => {
    e.preventDefault();
    const inputData = { wallet_name };

    try {
      const response = await fetch("http://localhost:3000/add_wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
        credentials: "include",
      });
      const data = await response.json();
      if(data.errorNewWallet){
        toast.warning(data.errorNewWallet)
      }
      else
      if (response.ok) {
        console.log(data.message);
        toast.success('Billetera creada')
        setWallet_name("");
      } else {
        console.log("No se pudo completar la carga");
      }
    } catch (error) {
      console.error("Error al enviar el formulario", error);
    }
  };

  return (
    
    <div  className='flex flex-col gap-3'>
    <Toaster richColors  />
      <div >
        <h1 className='m-6 text-4xl'>Crear nueva billetera</h1>
      </div>
      <form onSubmit={handleSubmitAddWallet} className="flex flex-col gap-5">
        <TextField
          id='standard-basic'
          label='Agregar billetera'
          variant='standard'
          type='text'
          autoComplete='off'
          name='wallet_name'
          placeholder='Agregar billetera'
          value={wallet_name.charAt(0).toUpperCase() + wallet_name.slice(1)}
          onChange={(e) => setWallet_name(e.target.value)}
        />

        <div className='flex justify-center '>
          <button className='flex justify-center items-center px-6 py-3 w-1/4 rounded-md border border-black bg-white text-neutarl-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200'>
            Agregar
          </button>
        </div>
      </form>

      <Button
        href={"/index"}
        text={"Volver"}
      ></Button>
    </div>
  );
}
