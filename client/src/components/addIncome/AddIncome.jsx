import React, { useEffect, useState } from "react";
import RedirectsBack from "../redirects/RedirectsBack";
import RedirectsIndex from "../redirects/RedirectsIndex";
import fetchWallet from "../../service/wallet";
export default function AddIncome() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [id_wallet, setIdWallet] = useState("");
  const [wallet, setWallet] = useState([]);

    // Función para cargar las billeteras y actualizar los estados
    const loadWallets = () => {
      fetchWallet.fetchDataWallet()
        .then(data => {
          setWallet(data.resultQueryWallet);
          // Configurar el primer valor del select
          if (data.resultQueryWallet.length > 0) {
            setIdWallet(data.resultQueryWallet[0].id_wallet);
          } else {
            setIdWallet('');
          }
        })
        .catch(error => {
          console.error("Error al obtener las transacciones:", error);
        });
    }
  
    useEffect(() => {
      loadWallets();
    }, []);

  const handleSubmitAddIncome = async (e) => {
    e.preventDefault();
    const inputData = { id_wallet, amount, description };
    try {
      const response = await fetch(`http://localhost:3000/add_transaction/1`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
        credentials: "include",
      });
      const data = await response.json;
      if (response.ok) {
        loadWallets();
        setAmount("");
        setDescription("");
      } else {
        console.log("No se pudo completar el envío del formulario");
      }
    } catch (error) {
      console.error("Error al enviar formulario", error);
    }
  };

  if(wallet.length > 0){

    return (
      <>
      <h1>Agregar ingresos</h1>
      <form onSubmit={handleSubmitAddIncome}>
      <select onChange={(e) => setIdWallet(e.target.value)}>
        
        {wallet.map((walletName, index) => (
          <option key={index} value={walletName.id_wallet}>
            {walletName.wallet_name.toUpperCase()}
          </option>
        ))}
        </select>
        <input
          type='number'
          autoComplete='off'
          name='amount'
          placeholder='Agregar monto'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        ></input>
        <input
          type='text'
          autoComplete='off'
          name='description'
          placeholder='Agregar descripción'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button>Agregar</button>
      </form>
      <RedirectsBack
        href={"/index"}
        text={"Volver"}
      ></RedirectsBack>
    </>
  );
} 
else {
  return (
    <>
      <h1>Cargar billeteras antes de cargar ingresos</h1>
      <RedirectsIndex href={'/add_wallet'} text={'Cargar billetera'}></RedirectsIndex>
      <RedirectsBack
        href={"/index"}
        text={"Inicio"}
      ></RedirectsBack>
    </>
  );
}
}
