import React, { useEffect, useState } from "react";
import Button from "../redirects/Button";

import fetchWallet from "../../service/wallet";
import FormAddTransaction from "../formAddTransaction/FormAddTransaction";


export default function AddIncome() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [id_wallet, setIdWallet] = useState("");
  const [wallet, setWallet] = useState([]);

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
      })
      .catch((error) => {
        console.error("Error al obtener las transacciones:", error);
      });
  };

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

  if (wallet.length > 0) {
    return (
      <>
        <FormAddTransaction
          transaction={"INGRESO"}
          handleSubmitAddIncome={handleSubmitAddIncome}
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
          <h1>Cargar billeteras antes de cargar ingresos</h1>
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
