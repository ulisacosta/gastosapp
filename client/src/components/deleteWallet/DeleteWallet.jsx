import React, { useEffect, useState } from "react";
/* Import para botón de volver */
import Button from "../redirects/Button";
/* Import request */
import fetchWallet from "../../service/wallet";
/* Import loader */
import "ldrs/bouncy";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

export default function DeleteWallet() {
  /* Estado para el id que se va a eliminar */
  const [id_wallet, setIdWallet] = useState("");
  /* Estado para generar los nombres de las billeteras */
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

  /* Fetch para mostrar las billeteras */
  useEffect(() => {
    loadWallets();
  }, []);

  /*  FETCH para enviar formulario */
  const handleSubmitDeleteWallet = async (e) => {
    e.preventDefault();
    const inputData = { id_wallet };
    fetchWallet.fetchDeleteWallet(inputData, loadWallets);
  };

  /* Validamos si hay billeteras en la db */
  if (loading) {
    return (
      <l-bouncy
        size='55'
        speed='1.8'
        color='#0033ff'
      ></l-bouncy>
    );
  } else if (wallet.length > 0) {
    return (
      <div className='flex flex-col gap-3'>
        <h1 className='m-6 text-4xl'>Eliminar billetera</h1>
        <form
          onSubmit={handleSubmitDeleteWallet}
          className='flex flex-col gap-5'
        >
          <TextField
            size='small'
            id='outlined-select-currency'
            select
            onChange={(e) => setIdWallet(e.target.value)}
            label='Seleccionar billetera'
            value={id_wallet}
          >
            {wallet.map((walletName, index) => (
              <MenuItem
                key={index}
                value={walletName.id_wallet}
              >
                {walletName.wallet_name.toUpperCase()}
              </MenuItem>
            ))}
          </TextField>
          <div className='flex justify-center '>
            <button className=' flex justify-center items-center px-6 py-3 w-1/4 rounded-md border border-black bg-white text-neutarl-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200'>
              Eliminar
            </button>
          </div>
        </form>

        <Button
          href={"/index"}
          text={"Inicio"}
        ></Button>
      </div>
    );
  } else {
    return (
      <>
        <h1 className="m-6 text-4xl">No se encontraron billeteras</h1>
        <Button
          href={"/index"}
          text={"Inicio"}
        ></Button>
      </>
    );
  }
}
