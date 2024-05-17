import React from "react";
import { Navbar, Nav } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import { FaWallet } from "react-icons/fa";
export default function NavBar() {
  return (
    <Navbar>
      <Navbar.Brand href='/index'>
        <FaWallet size={20}/>
      </Navbar.Brand>
      <Nav>
        <Nav.Item href='/index'>Inicio</Nav.Item>
        <Nav.Item href='/transactions'>Cuenta</Nav.Item>
        <Nav.Item href='/add_Wallet'>Cargar billetera</Nav.Item>
        <Nav.Item href="/delete_wallet">Eliminar billetera</Nav.Item>

          <Nav.Item href="/add_transaction/1">Ingreso</Nav.Item>
          <Nav.Item href="/add_transaction/2">Gasto</Nav.Item>
          

      </Nav>
    </Navbar>
  );
}
