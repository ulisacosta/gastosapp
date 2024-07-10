import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import fetchLogin from "../../service/login";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmitLogin = (e) => {
    e.preventDefault();

    fetchLogin.fetchLogin({ user, password }).then(response => {

      if (response.ok) {
        Swal.fire({
          toast:true,
          title: "Sesión iniciada!",
         /*  text: response.message, */
          position:'top-end',
          icon: "success",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        navigate("/index");
      } else {
        Swal.fire({
          title: "Verificar datos",
          text: response.error,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    })
  

  };

  return (
    <div className='border border-black rounded-3xl p-8 flex flex-col gap-4'>
      <h1>Iniciar sesión</h1>
      <form
        className='flex flex-col w-80 gap-8'
        onSubmit={handleSubmitLogin}
      >
        <TextField
          autoFocus
          id='input_user'
          label='Usuario o email'
          variant='standard'
          type='text'
          autoComplete='off'
          name='user'
          placeholder='Ingresar usuario o email'
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <TextField
          id='input_password'
          label='Contraseña'
          variant='standard'
          type='password'
          autoComplete='off'
          name='password'
          placeholder='Ingresar contraseña'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant='outlined'
          type='submit'
        >
          Ingresar
        </Button>
      </form>
      <div>
        <p>¿Aún no tienes una cuenta?</p>
        <a>Registrarse</a>
      </div>
    </div>
  );
}
