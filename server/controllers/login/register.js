const dbConnect = require("../../config/mysql");
const bcryptjs = require("bcryptjs");

const {finishDB} = require('../../util/finishDB');

module.exports.register = async (req,res) => {
  const db =  dbConnect();
  try {

        const { email,user, user_name, password} = req.body;

        let passHash = await bcryptjs.hash(password, 8);
        const checkUser = 'SELECT COUNT(*) AS userCount FROM users WHERE email = ? OR user = ?'
        const sqlInsertUser = "INSERT INTO users SET ? ";

        db.query(checkUser,[email,user],(errCheckUser,resultCheckUser)=>{
          if(errCheckUser){
            console.error('Error al verificar el usuario',errCheckUser);
            finishDB(db);
            return res.status(500).json({error:'Error interno del servidor'});
          }
        if(resultCheckUser[0].userCount > 0){
          finishDB(db);
          return res.status(409).json({ error: 'El correo electrónico o el nombre de usuario ya existen' });
        }
        else{

          db.query(
            sqlInsertUser,
            {email,user,user_name, password:passHash,id_role:2},
            (errRegister, result) => {
              if (errRegister) {
                console.error('Error al crear nuevo usuario',errRegister);
                finishDB(db);
                return res.status(500).json({error:'Error interno del servidor'});
              }
              else{
             
                console.log('Usuario creado con exito')
                finishDB(db);
                return res.status(201).json({ message: 'Usuario creado con éxito' });
              }
            }
          );
        }
      })
    } catch (errRegister) {
      console.error('Error en el proceso de registro', errRegister);
      finishDB(db); // Asegúrate de cerrar la conexión en caso de error
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    }