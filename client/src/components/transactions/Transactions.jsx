import React, { useEffect, useState } from "react";
import Button from "../redirects/Button";

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

        data.resultQueryTransaction.forEach((transaction) => {
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
    <div className=''>
      <div className='m-4 flex flex-col gap-3'>
        <h1 className='m-6 text-4xl'>Mis billeteras</h1>
  
      </div>
      <div className='w-full'>
        <div className='flex flex-wrap justify-around gap-20'>
          {Object.keys(transactions).length > 0 ? (
            Object.entries(transactions).map(
              ([walletName, walletTransactions], index) => (
                <div
                  key={index}
                  className=''
                >
                  <h2 className='font-bold border border-black flex justify-between'>
                    {walletName.toUpperCase()}{" "}
                    <span className="font-bold">
                      $
                      {walletTransactions.reduce((total, transaction) => {
                        return total + Number(transaction.amount);
                      }, 0)}
                    </span>
                  </h2>
                  <div className='overflow-auto border-black max-h-96'>
                    <table className='border-black w-full'>
                      <thead>
                        <tr>
                          <th>Fecha</th>
                          <th>Descripción</th>
                          <th>Monto</th>
                        </tr>
                      </thead>
                      <tbody>
                        {walletTransactions.map((transaction, idx) => (
                          <tr key={idx}>
                            <td>
                              {new Date(
                                transaction.created_at
                              ).toLocaleDateString()}
                            </td>
                            <td className="font-semibold">{transaction.description}</td>
                            <td>${transaction.amount}</td>
                          </tr>
                        ))}

                        <tr>
                          <td colSpan={2}>TOTAL</td>
                          <td className='font-extrabold'>
                            $
                            {walletTransactions.reduce((total, transaction) => {
                              return total + Number(transaction.amount);
                            }, 0)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            )
          ) : (
            <p>No se encontraron billeteras con saldo</p>
          )}
        </div>
      </div>
    </div>
  );
}
