import React, { useEffect, useState } from "react";
import { Toaster, toast } from 'sonner';
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para la redirección
import fetchWallet from "../../service/wallet/wallet";
import FormAddTransaction from "../formAddTransaction/FormAddTransaction";

/* Importamos el loader de un modo más declarativo */
import { bouncy } from "ldrs";

// Registramos el loader para poder usarlo en el JSX
bouncy.register();

export default function AddTransaction(props) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [id_wallet, setIdWallet] = useState("");
  const [wallets, setWallets] = useState([]); // Cambié el nombre del estado a 'wallets' para mayor claridad
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook para la navegación

  useEffect(() => {
    const loadWallets = async () => {
      try {
        const data = await fetchWallet.fetchDataWallet();
        setWallets(data.resultQueryWallet);
        if (data.resultQueryWallet.length > 0) {
          setIdWallet(data.resultQueryWallet[0].id_wallet);
        } else {
          setIdWallet("");
        }
      } catch (error) {
        toast.error("Error al obtener las billeteras.");
        console.error("Error al obtener las billeteras:", error);
      } finally {
        setLoading(false);
      }
    };

    loadWallets();
  }, []);

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    const inputData = { id_wallet, amount, description };

    try {
      const response = await fetch(`http://localhost:3000/add_transaction/${props.id_transaction}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        // Manejamos errores de la API, como campos faltantes o inválidos
        const errorMessage = data.errorFields || "No se pudo completar el envío del formulario.";
        toast.error(errorMessage);
        return; // Detenemos la ejecución si hay un error
      }

      // Si la respuesta es exitosa
      toast.success('Monto agregado con éxito');
      setAmount("");
      setDescription("");
      // Redireccionamos después de un breve retraso para que el usuario vea el mensaje
      setTimeout(() => {
        navigate('/transactions');
      }, 1500); 

    } catch (error) {
      console.error("Error al enviar formulario", error);
      toast.error("Error de conexión. Inténtalo de nuevo más tarde.");
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <Toaster richColors />
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-lg">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            No tienes billeteras registradas.
          </h1>
          <p className="text-gray-600 mb-6">
            Para poder {props.header}, primero necesitas crear al menos una billetera.
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
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
      <Toaster richColors />
      <FormAddTransaction
        transaction={props.header}
        handleSubmitAdd={handleSubmitAdd}
        wallet={wallets}
        amount={amount}
        setAmount={setAmount}
        description={description}
        setDescription={setDescription}
        idWallet={id_wallet}
        setIdWallet={setIdWallet}
      />
    </div>
  );
}