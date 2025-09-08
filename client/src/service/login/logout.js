const url = "http://localhost:3000";

export const fetchLogout = async () =>{
    try{
        const response = await fetch(url+'/logout',{
            method:'GET',
            headers:{
                'Content-type':'application/json'
            },
            credentials:'include'
        })
        if(!response.ok){
            throw new Error(`HTTP error stats: ${response.status}`)
        }
        
        else{
           
            return { ok: response.ok};
        }
    }
    catch(error){
        console.error("Error al obtener las transacciones:", error);
    }
    }

