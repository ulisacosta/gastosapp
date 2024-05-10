const url = 'http://localhost:3000/'

const fetchDataWallet = async () => {
    try{
      const response = await fetch (`${url}query_wallet`,{
        method:'GET',
        headers:{'Content-Type':'application/json'}
      }
    )

  if(!response.ok){
    throw new Error(`HTTP error stats: ${response.status}`)
  }
  const data = await response.json();
  return data
        
    } catch (error) {
      console.error("Error al obtener las transacciones:", error);
    }
    }

    const fetchDeleteWallet = async (inputData,loadWallets) => {
        try {
            const response = await fetch("http://localhost:3000/delete_wallet", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(inputData),
              credentials: "include",
            });
            const data = await response.json;
            if (response.ok) {
              /* Recargar billeteras nuevamente */
              loadWallets();
            } else {
              console.log("No se pudo completar el envío de formulario");
            }
          } catch (error) {
            console.error("Error en el servidor");
          }
    }



    export default {fetchDataWallet,fetchDeleteWallet}