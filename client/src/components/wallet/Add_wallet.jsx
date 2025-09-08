import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para la redirección
import TextField from "@mui/material/TextField";
import { MdAccountBalanceWallet } from "react-icons/md"; // Importamos un ícono

export default function Add_wallet() {
  const [wallet_name, setWallet_name] = useState("");
  const navigate = useNavigate(); // Hook para la navegación

  const handleSubmitAddWallet = async (e) => {
    e.preventDefault();
    
    // Validación simple en el cliente para un mejor UX
    if (wallet_name.trim() === "") {
        toast.warning("El nombre de la billetera no puede estar vacío.");
        return;
    }

    const inputData = { wallet_name: wallet_name.trim() }; // Usamos trim() para limpiar espacios en blanco

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
      
      if (!response.ok) {
        const errorMessage = data.errorNewWallet || "No se pudo completar la carga.";
        toast.error(errorMessage);
        return;
      }
      
      toast.success("Billetera creada con éxito.");
      setWallet_name(""); // Limpiamos el input después de un éxito

      // Redirigimos al usuario a la página de transacciones después de un breve retraso
      setTimeout(() => {
        navigate("/transactions");
      }, 1500);

    } catch (error) {
      console.error("Error al enviar el formulario", error);
      toast.error("Error de conexión. Inténtalo de nuevo.");
    }
  };

  return (
    <div className='flex flex-col items-center  min-h-screen bg-gray-100 p-8'>
      <Toaster richColors />
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 text-center">
        {/* Encabezado del formulario con ícono y título */}
        <div className="flex flex-col items-center mb-6">
            <div className="p-3 bg-blue-600 rounded-full text-white mb-4">
                <MdAccountBalanceWallet size={40} />
            </div>
            <h1 className='text-3xl font-bold text-gray-800'>Crear nueva billetera</h1>
        </div>

        {/* Formulario principal */}
        <form onSubmit={handleSubmitAddWallet} className='flex flex-col gap-6 mt-4'>
          <TextField
            fullWidth
            size="small"
            id='wallet_name'
            label='Nombre de la billetera'
            variant='outlined'
            type='text'
            autoComplete='off'
            value={wallet_name}
            onChange={(e) => setWallet_name(e.target.value)}
          />

          <div className='flex justify-center'>
            <button
              type="submit"
              className='w-full py-3 px-6 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-colors duration-200'
            >
              Agregar
            </button>
          </div>
        </form>

        {/* Botón de navegación a "Inicio" */}
        <button
            onClick={() => navigate("/index")}
            className="w-full mt-4 py-3 px-6 text-white rounded-lg font-medium hover:bg-gray-200 hover:text-gray-700 transition-colors"
        >
            Regresar a inicio
        </button>
      </div>
    </div>
  );
}