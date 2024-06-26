import { Route, Routes } from "react-router-dom";
import Login from './components/login/Login'
import Index from './components/index/Index'
import Add_wallet from './components/wallet/Add_wallet'
import Transactions from "./components/transactions/Transactions";
import AddIncome from "./components/addIncome/AddIncome";
import './App.css'
import AddExpense from "./components/addExpense/AddExpense";
import DeleteWallet from "./components/deleteWallet/DeleteWallet";
import NavBar from "./components/navbar/NavBar";

function App() {


  return (
    <>
  
  <div className="fixed top-0 left-0 w-full z-50 ">
  <NavBar></NavBar>
  </div>

      <Routes>
     <Route path="/" element={<Login/>}/> 
     <Route path="/login" element={<Login/>}/> 
     <Route path="/index" element={<Index/>}/> 
     <Route path="/transactions" element={<Transactions/>}/> 
     <Route path="/add_transaction/1" element={<AddIncome/>}/> 
     <Route path="/add_transaction/2" element={<AddExpense/>}/> 
     <Route path="/add_wallet" element={<Add_wallet/>}/> 
     <Route path="/delete_wallet" element={<DeleteWallet/>}/> 
     
     </Routes>
    </>
  )
}

export default App
