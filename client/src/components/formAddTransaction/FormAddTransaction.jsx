import React from "react";
import Button from "../redirects/Button";
import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

export default function FormAddTransaction(props) {
  const {
    transaction,
    handleSubmitAddIncome,
    wallet,
    amount,
    setAmount,
    description,
    setDescription,
    idWallet,
    setIdWallet,
  } = props;
  return (
    <div className="flex flex-col gap-3">
      <h1 className='m-6 text-4xl'>AGREGAR {transaction}</h1>

      <form
        onSubmit={handleSubmitAddIncome}
        className='flex flex-col gap-5'
      >
        <TextField
          size='small'
          id='outlined-select-currency'
          select
          onChange={(e) => setIdWallet(e.target.value)}
          label='Seleccionar billetera'
          defaultValue={wallet[0].id_wallet}
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

        <Input
          type='number'
          autoComplete='off'
          name='amount'
          placeholder='Agregar monto'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          id='standard-adornment-amount'
          startAdornment={<InputAdornment position='start'>$</InputAdornment>}
        />

        <TextField
          id='standard-basic'
          label='Descripción'
          variant='standard'
          type='text'
          autoComplete='off'
          name='description'
          placeholder='Agregar descripción'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

<div className="flex justify-center ">

        <button className=' flex justify-center items-center px-6 py-3 w-1/4 rounded-md border border-black bg-white text-neutarl-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200'>
          Agregar
        </button>
</div>
  
      </form>

      <Button
        href={"/index"}
        text={"Volver"}
      ></Button>
    </div>
  );
}
