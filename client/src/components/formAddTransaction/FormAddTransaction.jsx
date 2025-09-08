import React from "react";
import Button from "../redirects/Button";
import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { FaMoneyBillWave, FaEdit, FaWallet, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

export default function FormAddTransaction(props) {
  const {
    transaction,
    handleSubmitAdd,
    wallet,
    amount,
    setAmount,
    description,
    setDescription,
    idWallet,
    setIdWallet,
  } = props;

  return (
    <div className='bg-white p-8 rounded-xl shadow-2xl w-full max-w-md mx-auto '>
      <h1 className='text-2xl md:text-3xl font-extrabold text-gray-800 text-center mb-2'>
        AGREGAR {transaction.toUpperCase()}
      </h1>

      <form onSubmit={handleSubmitAdd} className='flex flex-col gap-'>
        {/* Campo para seleccionar billetera */}
        <TextField
          size='small'
          id='wallet-select'
          select
          onChange={(e) => setIdWallet(e.target.value)}
          label='Seleccionar billetera'
          defaultValue={wallet[0].id_wallet}
          fullWidth
          InputProps={{
            startAdornment: (
              
                <FaWallet className="text-gray-500" />
        
            ),
          }}
        >
          {wallet.map((walletName, index) => (
            <MenuItem key={index} value={walletName.id_wallet}>
              {walletName.wallet_name.toUpperCase()}
            </MenuItem>
          ))}
        </TextField>

        {/* Campo para el monto con Input */}
        <div className="">
          <Input
            autoFocus
            type='number'
            autoComplete='off'
            name='amount'
            placeholder='Agregar monto'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            id='amount-input'
            fullWidth
        
            className="border-b-2 border-gray-200 focus:border-blue-500"
          />
        </div>
        
        {/* Campo para la descripción con TextField */}
        <TextField
          id='description-input'
          label='Descripción'
          variant='standard'
          type='text'
          autoComplete='off'
          name='description'
          placeholder='Agregar descripción'
          value={description.charAt(0).toUpperCase() + description.slice(1)}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
      
        />

        <div className='flex justify-center mt-6'>
          <button
            type="submit"
            className='flex items-center justify-center  rounded-xl bg-blue-600 text-white font-semibold text-lg shadow-md hover:bg-blue-700 transition-colors duration-200'
          >
            <FaCheckCircle className="" />
            AGREGAR
          </button>
        </div>
      </form>
    
  {/*     <div className="flex justify-center">
        <Button href={"/index"} text={"INICIO"}>
          <FaArrowLeft className="mr-2" />
        </Button>
      </div> */}
    </div>
  );
}