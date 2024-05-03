const dbConnect = require("../config/mysql");
const {finishDB} = require('../util/finishDB');


module.exports.add_transaction = (req,res) => {
    const db = dbConnect()

    const {id_wallet,amount,description} = req.body
    const {id_transaction_type} = req.params
    const date = new Date(Date.now())
    const sqlTransaction = 'INSERT INTO transaction VALUES (NULL,?,?,?,?,?)';

    db.query(sqlTransaction,[id_wallet,id_transaction_type,amount,description,date],(errTransaction,resultTransaction) => {
        if(errTransaction){
            console.error(errTransaction)
            console.log('No se pudo insertar transacción')
            finishDB(db)
        }
        else{
            console.log('Cargado con exito')
            finishDB(db)
        }
    })
}