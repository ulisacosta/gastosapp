const url = "http://localhost:3000";

const fetchLogin = async (formData) => {
    try{
        const response = await fetch(url + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            credentials: "include",
        });
        
   
        const data = await response.json();
    
        return { ok: response.ok, ...data };
    } catch (error) {
        /* console.error('Error en la solicitud de inicio de sesión', error); */
        return { ok: false, error: 'Error interno del servidor. Por favor, inténtalo más tarde.' };
      }
}

export default{fetchLogin}
