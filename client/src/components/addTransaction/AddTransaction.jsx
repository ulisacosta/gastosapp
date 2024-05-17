import React, { useEffect, useState } from "react";
import Button from "../redirects/Button";

import fetchWallet from "../../service/wallet";
import FormAddTransaction from "../formAddTransaction/FormAddTransaction";
/* Import loader */
import "ldrs/bouncy";
import { Toaster, toast } from 'sonner'

export default function AddTransaction(props) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [id_wallet, setIdWallet] = useState("");
  const [wallet, setWallet] = useState([]);
  /* Estado para loader */
  const [loading, setLoading] = useState(true);

  // Función para cargar las billeteras y actualizar los estados
  const loadWallets = () => {
    fetchWallet
      .fetchDataWallet()
      .then((data) => {
        
        setWallet(data.resultQueryWallet);
        // Configurar el primer valor del select
        if (data.resultQueryWallet.length > 0) {
          setIdWallet(data.resultQueryWallet[0].id_wallet);
        } else {
          setIdWallet("");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener las transacciones:", error);
      });
  };
 

    useEffect(() => {
      loadWallets();
    }, []);


  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    const inputData = { id_wallet, amount, description };
    try {
      const response = await fetch(`http://localhost:3000/add_transaction/${props.id_transaction}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
        credentials: "include",
      });
      const data = await response.json();

      if(data.errorFields ){
        toast.warning(data.errorFields);
      }
    
      else
      if (response.ok) {
        toast.success('Monto agregado')
        setAmount("");
        setDescription("");
      } else {
        console.log("No se pudo completar el envío del formulario");
      }
    } catch (error) {
      console.error("Error al enviar formulario", error);
    }
  };

  
  if (loading) {
    return (
      <l-bouncy
        size='55'
        speed='1.8'
        color='#0033ff'
      ></l-bouncy>
    );
  } else 
  if (wallet.length > 0) {
    return (
      <>
      <Toaster richColors  />
        <FormAddTransaction
          transaction={props.header}
          handleSubmitAdd={handleSubmitAdd}
          wallet={wallet}
          amount={amount}
          setAmount={setAmount}
          description={description}
          setDescription={setDescription}
          idWallet={id_wallet}
          setIdWallet={setIdWallet}
        />
      </>
    );
  } else {
    return (
      <>
        <div className='flex flex-col gap-8'>
          <h1 className="m-6 text-4xl">Cargar billeteras antes de cargar {props.text}</h1>
          <div className=' flex  gap-4 justify-center'>
            <Button
              href={"/add_wallet"}
              text={"Cargar billetera"}
            ></Button>
            <Button
              href={"/index"}
              text={"Inicio"}
            ></Button>
          </div>
        </div>
      </>
    );
  }
}
