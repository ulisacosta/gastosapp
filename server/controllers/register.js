const dbConnect = require("../config/mysql");
const bcryptjs = require("bcryptjs");

const {finishDB} = require('../util/finishDB');

module.exports.register = async (req,res) => {
    const db =  dbConnect();
    try {
        const { user, user_name, password} = req.body;
        let passHash = await bcryptjs.hash(password, 8);
        const sql = "INSERT INTO users SET ?";
    
         db.query(
          sql,
          { user, user_name, password: passHash },
          (errRegister, result) => {
            if (errRegister) {
              console.log(errRegister);
            }
            console.log('Usuario creado con exito')
          }
        );
        finishDB(db);
      } catch (err) {
        console.log(err);
      }
}