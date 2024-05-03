const dbConnect = require("../config/mysql");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {finishDB} = require('../util/finishDB');


module.exports.isAuthenticated = async (req,res,next)=>{
    const db =  dbConnect();
    if(req.cookies.jwt){
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET)
            db.query('SELECT users.* FROM users WHERE id_user = ?',[decoded.id],(err,results)=>{
                if(!results){return next()}
                req.user = results[0] 
                
                // Verificar si el token está a punto de expirar
        const tokenExpiry = decoded.exp * 1000; // La expiración del token en milisegundos
        const currentTime = Date.now();

        if (tokenExpiry - currentTime < 60000) { // Redirigir si el token está a punto de expirar en menos de 1 minuto
          console.log('El token expiró')
        }
                return next()    
            })
          finishDB();
        } catch (error) {
            console.log(error)
             
        }}
        else{
            console.log('Autenticado con éxito')
           finishDB()
        }
    }