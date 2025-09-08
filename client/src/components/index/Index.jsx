import React from 'react';
import RedirectsIndex from '../redirects/RedirectsIndex';
import { GiPiggyBank } from 'react-icons/gi';
import { MdAccountBalanceWallet, MdAdd, MdRemove, MdDelete } from 'react-icons/md';

export default function Index() {
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8'>
      {/* Sección principal con el logo y el título */}
      <div className='flex flex-col items-center mb-12'>
        <div className='p-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg mb-4'>
          <GiPiggyBank size={80} className='text-white' />
        </div>
        <h1 className='text-3xl font-bold text-gray-800 tracking-tight'>Gestor de Cuentas</h1>
        <p className='text-gray-600 mt-2 text-center'>
          Administra tus finanzas personales de manera sencilla.
        </p>
      </div>

      {/* Contenedor de las tarjetas */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl'>
        <RedirectsIndex 
          text="Ver cuentas" 
          description="Revisa el estado y movimientos de tus billeteras."
          href="/transactions" 
          icon={<MdAccountBalanceWallet size={24} />} // <- Se agregó el ícono aquí
        />
        <RedirectsIndex 
          text="Agregar ingreso" 
          description="Registra un nuevo ingreso en una billetera."
          href="/add_transaction/1" 
          icon={<MdAdd size={24} />} // <- Se agregó el ícono aquí
        />
        <RedirectsIndex 
          text="Agregar gasto" 
          description="Registra un nuevo gasto en una billetera."
          href="/add_transaction/2" 
          icon={<MdRemove size={24} />} // <- Se agregó el ícono aquí
        />
        <RedirectsIndex 
          text="Agregar billetera" 
          description="Crea una nueva billetera para tus finanzas."
          href="/add_wallet" 
          icon={<MdAdd size={24} />} // <- Se agregó el ícono aquí
        />
        <RedirectsIndex 
          text="Eliminar billetera" 
          description="Elimina una billetera existente del sistema."
          href="/delete_wallet" 
          icon={<MdDelete size={24} />} // <- Se agregó el ícono aquí
        />
      </div>
    </div>
  );
}