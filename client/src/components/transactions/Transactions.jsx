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
            credentials: "include",
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
    <div className='p-4 min-h-screen '> {/* Agregado un fondo y padding para el contenedor principal */}
      <div className='m-6'> {/* Contenedor para el título, con un margen más estético */}
        <h1 className='text-4xl font-bold text-gray-800 tracking-tight'>Mis Billeteras</h1> {/* Mejor tipografía y color */}
      </div>
      <div className='w-full'>
        <div className='flex flex-wrap justify-center gap-6 p-4'> {/* Centramos el contenido y ajustamos el espacio entre tarjetas */}
          {Object.keys(transactions).length > 0 ? (
            Object.entries(transactions).map(
              ([walletName, walletTransactions], index) => (
                <div
                  key={index}
                  className='bg-white shadow-xl rounded-lg overflow-hidden w-full md:w-96' /* Estilo de tarjeta, ancho flexible y sombra */
                >
                  <div className='p-5 bg-gray-200 border-b border-gray-300 flex justify-between items-center'> {/* Estilo del encabezado */}
                    <h2 className='text-xl font-bold text-gray-800'>{walletName.toUpperCase()}</h2>
                    <span className="text-xl font-bold text-gray-800">
                      ${walletTransactions.reduce((total, transaction) => total + Number(transaction.amount), 0)}
                    </span>
                  </div>
                  <div className='overflow-auto max-h-80'> {/* Altura máxima con scroll */}
                    <table className='min-w-full divide-y divide-gray-200'> {/* Tabla con estilo de divisor */}
                      <thead className='bg-gray-50'>
                        <tr>
                          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Fecha</th>
                          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Descripción</th>
                          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Monto</th>
                        </tr>
                      </thead>
                      <tbody className='bg-white divide-y divide-gray-200'>
                        {walletTransactions.map((transaction, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 transition-colors"> {/* Efecto al pasar el mouse */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(transaction.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{transaction.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${transaction.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* Total en el pie de la tarjeta para mejor legibilidad */}
                  <div className='p-5 bg-gray-200 text-right font-extrabold text-gray-800'>
                     TOTAL: ${walletTransactions.reduce((total, transaction) => total + Number(transaction.amount), 0)}
                  </div>
                </div>
              )
            )
          ) : (
            <p className="text-gray-500 text-center text-lg mt-10">No se encontraron billeteras con saldo</p>
          )}
        </div>
      </div>
    </div>
  );
}