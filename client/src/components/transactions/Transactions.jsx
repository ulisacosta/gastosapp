import React, { useEffect, useState } from "react";
import RedirectsBack from "../redirects/RedirectsBack";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/query_transaction",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
  
        const walletMap = {};
      
        data.resultQueryTransaction
        .forEach((transaction) => {
            if (walletMap[transaction.wallet_name]) {
                walletMap[transaction.wallet_name].push(transaction);
            } else {
                walletMap[transaction.wallet_name] = [transaction];
            }
        });
        setTransactions(walletMap); 
      

    
    
      } catch (error) {
        console.error("Error al obtener las transacciones:", error);
      }
    };

    fetchData();
  }, []);





  return (
    <div className=" ">
        <h1 className="">Mis billeteras</h1> 
        <RedirectsBack href={'/index'} text={'Inicio'}></RedirectsBack>
        <div className="w-full">

        <div className="flex flex-wrap justify-around gap-20">

        {Object.keys(transactions).length > 0 ? (
            Object.entries(transactions).map(([walletName, walletTransactions], index) => (
              
                <div key={index} className=" " >
                    <h2 className="font-extrabold border border-black">{walletName.toUpperCase()}</h2>
                    <table className="border-black">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {walletTransactions.map((transaction, idx) => (
                                <tr key={idx}>
                                    <td>{transaction.description}</td>
                                    <td>{new Date(transaction.created_at).toLocaleDateString()}</td>
                                    <td>${transaction.amount}</td>
                                    
                              
                             
                                </tr>

                            ))}
                            
                            <tr >
                              <td colSpan={2}>TOTAL</td>
                              <td className="font-extrabold">${walletTransactions.reduce((total,transaction)=>{
                                return total + Number(transaction.amount)
                              },0)}</td>
                            </tr>
                          
                        </tbody>
                    </table>
                </div>
            )
            )
        ) 
        : (
            <p>No transactions found</p>
        )}
        </div>
        </div>
    </div>
);

}
