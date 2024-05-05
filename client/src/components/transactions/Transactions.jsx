import React, { useEffect, useState } from 'react'

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/query_transaction', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data)
                setTransactions(data.resultQueryTransaction)
            } catch (error) {
                console.error("Error al obtener las transacciones:", error);
            }
        };
    
        fetchData();
    }, []);

  return (
    <div>

    <div>Estado de la cuenta</div>
    {transactions.length > 0 ? (
        <ul>
            {transactions.map((transaction,index)=>(
                <li key={index}>
                    {transaction.wallet_name} {transaction.description} ${transaction.amount}
                </li>
            ))}
        </ul>
    ):(
        <p>No se encontraron cuentas</p>
    )}
    </div>
  )
}
