import React from 'react';
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from './components/login/Login';
import Index from './components/index/Index';
import AddExpense from "./components/addExpense/AddExpense";
import DeleteWallet from "./components/deleteWallet/DeleteWallet";
import NavBar from "./components/navbar/NavBar";
import Add_wallet from './components/wallet/Add_wallet';
import Transactions from "./components/transactions/Transactions";
import AddIncome from "./components/addIncome/AddIncome";
import './App.css';
import { isTokenValid } from "./utils/validateTokenJWT";

function App() {

  const tokenExistAndStillValid = isTokenValid();
  const location = useLocation();

 
  const noNavBarPaths = ['/', '/login'];

  const showNavBar = !noNavBarPaths.includes(location.pathname);

  return (
    <div>
  
      {showNavBar && (
        <div className="fixed top-0 left-0 w-full z-50">
          <NavBar />
        </div>
      )}

      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/index" element={tokenExistAndStillValid ? <Index /> : <Navigate to="/login" />} />
        <Route path="/transactions" element={tokenExistAndStillValid ? <Transactions /> : <Navigate to="/login" />} />
        <Route path="/add_transaction/1" element={tokenExistAndStillValid ? <AddIncome /> : <Navigate to="/login" />} />
        <Route path="/add_transaction/2" element={tokenExistAndStillValid ? <AddExpense /> : <Navigate to="/login" />} />
        <Route path="/add_wallet" element={tokenExistAndStillValid ? <Add_wallet /> : <Navigate to="/login" />} />
        <Route path="/delete_wallet" element={tokenExistAndStillValid ? <DeleteWallet /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;