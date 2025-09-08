import React, { useEffect, useState } from "react";
import { Toaster, toast } from 'sonner';
import { useNavigate } from "react-router-dom";
import fetchWallet from "../../service/wallet/wallet";
import { bouncy } from "ldrs";

// Material UI components for a modern form
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

// Register the loader
bouncy.register();

export default function DeleteWallet() {
  const [id_wallet, setIdWallet] = useState("");
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadWallets = async () => {
      try {
        const data = await fetchWallet.fetchDataWallet();
        setWallets(data.resultQueryWallet);
        if (data.resultQueryWallet.length > 0) {
          setIdWallet(data.resultQueryWallet[0].id_wallet);
        }
      } catch (error) {
        console.error("Error fetching wallets:", error);
        toast.error("Error al cargar las billeteras.");
      } finally {
        setLoading(false);
      }
    };
    loadWallets();
  }, []);

  const handleSubmitDeleteWallet = async (e) => {
    e.preventDefault();
    if (!id_wallet) {
      toast.warning("Por favor, selecciona una billetera para eliminar.");
      return;
    }
    
    try {
      const response = await fetchWallet.fetchDeleteWallet({ id_wallet });
      if (response && response.message) {
        toast.success(response.message);
        setTimeout(() => {
          navigate("/index");
        }, 1500);
      } else {
        toast.error("No se pudo eliminar la billetera.");
      }
    } catch (error) {
      console.error("Error during wallet deletion:", error);
      toast.error("Ocurrió un error inesperado.");
    }
  };

  /* ------------------- Renderizado Condicional Mejorado ------------------- */
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <l-bouncy size='55' speed='1.8' color='#0033ff'></l-bouncy>
      </div>
    );
  }

  if (wallets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
        <Toaster richColors />
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            No tienes billeteras para eliminar.
          </h1>
          <p className="text-gray-600 mb-6">
            Crea una billetera primero para poder gestionarla.
          </p>
          <button
            onClick={() => navigate("/add_wallet")}
            className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Crear billetera ahora
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className='flex flex-col items-center  min-h-screen bg-gray-100 p-8'>
      <Toaster richColors />
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
        <h1 className='text-3xl font-bold text-gray-800 text-center mb-8'>Eliminar billetera</h1>
        <form onSubmit={handleSubmitDeleteWallet} className='flex flex-col gap-6'>
          <TextField
            fullWidth
            select
            label='Seleccionar billetera'
            value={id_wallet}
            onChange={(e) => setIdWallet(e.target.value)}
            size="small"
            helperText="Selecciona la billetera que deseas eliminar."
          >
            {wallets.map((walletItem) => (
              <MenuItem key={walletItem.id_wallet} value={walletItem.id_wallet}>
                {walletItem.wallet_name.toUpperCase()}
              </MenuItem>
            ))}
          </TextField>
          <div className='flex justify-center mt-4'>
            <button
              type="submit"
              className='flex-1 py-3 px-6 rounded-lg bg-red-600 text-white font-semibold shadow-md hover:bg-red-700 transition-colors duration-200'
            >
              Eliminar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}