import React from 'react'
import RedirectsIndex from '../redirects/RedirectsIndex'
import { GiPiggyBank } from "react-icons/gi";


export default function Index() {
  return (
    <div className='flex  flex-col gap-9'>
 

      <div className=' flex justify-center'>   <GiPiggyBank size={80} />
 </div>
      <div className=' flex gap-6'>
      <RedirectsIndex text={"Ver cuentas"} href={"/transactions"}></RedirectsIndex>
      <RedirectsIndex text={"Agregar ingreso"} href={"/add_transaction/1"}></RedirectsIndex>
      <RedirectsIndex text={"Agregar gasto"} href={"/add_transaction/2"}></RedirectsIndex>
      <RedirectsIndex text={"Agregar billetera"} href={"/add_wallet"}></RedirectsIndex>
      <RedirectsIndex text={"Eliminar billetera"} href={"/delete_wallet"}></RedirectsIndex>

      </div>
    </div>
  )
}
