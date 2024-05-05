import { Route, Routes } from "react-router-dom";
import './App.css'
import Login from './components/login/Login'
import Index from './components/index/Index'
import Add_wallet from './components/wallet/Add_wallet'
import Transactions from "./components/transactions/Transactions";

function App() {


  return (
    <>
      <Routes>
     <Route path="/" element={<Login/>}/> 
     <Route path="/login" element={<Login/>}/> 
     <Route path="/index" element={<Index/>}/> 
     <Route path="/transactions" element={<Transactions/>}/> 
     <Route path="/add_wallet" element={<Add_wallet/>}/> 
     
     </Routes>
    </>
  )
}

export default App
