const dbConnect = require("../config/mysql");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {finishDB} = require('../util/finishDB');


module.exports.login = (req,res) => {
    const db = dbConnect()
    try {
        const { user, password } = req.body
        
        if (!user || !password) {
             res.status(400).json({ error: "Usuario y/o contraseña no proporcionados" });
            finishDB(db)
            }
            else{
                const sqlLogin = 'SELECT users.user,users.password FROM users WHERE users.user = ?';

                db.query(sqlLogin,[user],async (errLogin,resultLogin)=>{
                    if(errLogin){
                        console.log(errLogin);
                        return res.status(500).json({error:'Error interno del servidor'});
                    }
                    else if(resultLogin.length === 0 || (await bcryptjs.compare(password,resultLogin[0].password))){
                        res.status(401).json({error:'Usuario y/o contraseña incorrecto'})
                        
                        finishDB(db)
                    }
             
            else{
                const id = resultLogin[0].id_user;
                const token = jwt.sign({id:id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_TIME_EXPIRE})
                
                const cookiesOptions = {
                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    httpOnly: true,
                    sameSite: 'None'
                };
                res.cookie('jwt',token,cookiesOptions)
                res.status(200).json({message:'inicio de sesión exitoso',token});
                finishDB(db);

            }
           
        })
    }

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error interno del servidor" });
        }

}

