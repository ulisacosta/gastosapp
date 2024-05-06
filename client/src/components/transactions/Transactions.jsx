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
        console.log(data);
        setTransactions(data.resultQueryTransaction);
      } catch (error) {
        console.error("Error al obtener las transacciones:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>Estado de la cuenta</div>
    <RedirectsBack href={"/index"} text={'Inicio'}></RedirectsBack>
      {transactions.length > 0 ? (
        <table border="1" className="border-2 border-black">
        <thead >
        {transactions.map((transaction, index) => (  
          <tr>
            <th>{transaction.wallet_name}</th>
            <th>{transaction.amount}</th>
            <th>{transaction.description}</th>
            <th>{transaction.created_at}</th>
          </tr>
          ))}
        </thead>

{/* <tbody>

          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.id_transaction}</td>
              <td>{transaction.wallet_name}</td>
              <td>${transaction.amount}</td>
              <td>{transaction.description}</td>
              <td>${transaction.created_at}</td>
            </tr>
          ))}
</tbody> */}
        </table>
      ) : (
        <p>No se encontraron cuentas</p>
      )}
    </div>
  );
}
