const dbConnect = require("../../config/mysql")
const { finishDB } = require("../../util/finishDB")

module.exports.query_transaction = (req,res) => {
    const db = dbConnect()
    const sqlQuery = 'SELECT transaction.* FROM transaction'

    db.query(sqlQuery,(errQuery,resultQueryTransaction)=>{
        if(errQuery){
            console.error(errQuery)
            finishDB(db)
            return res.status(500).json({error:'Error interno del servidor no se pudo completar la consulta'});
        }
        else{
         
            finishDB(db)
            return res.status(200).json({success:'Consulta realizada',resultQueryTransaction});
        }
    })
}