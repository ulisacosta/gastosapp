import { Route, Routes } from "react-router-dom";
import Login from './components/login/Login'
import Index from './components/index/Index'
import Add_wallet from './components/wallet/Add_wallet'
import Transactions from "./components/transactions/Transactions";
import AddIncome from "./components/addIncome/AddIncome";
import './App.css'
import AddExpense from "./components/addExpense/AddExpense";

function App() {


  return (
    <>
      <Routes>
     <Route path="/" element={<Login/>}/> 
     <Route path="/login" element={<Login/>}/> 
     <Route path="/index" element={<Index/>}/> 
     <Route path="/transactions" element={<Transactions/>}/> 
     <Route path="/add_transaction/1" element={<AddIncome/>}/> 
     <Route path="/add_transaction/2" element={<AddExpense/>}/> 
     <Route path="/add_wallet" element={<Add_wallet/>}/> 
     
     </Routes>
    </>
  )
}

export default App
