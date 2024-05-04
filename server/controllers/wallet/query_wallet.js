const dbConnect = require("../../config/mysql")
const { finishDB } = require("../../util/finishDB")


module.exports.query_wallet = (req,res) => {
    const db = dbConnect()
    const sqlQueryWallet = 'SELECT wallet.* FROM wallet'
    db.query(sqlQueryWallet,(errQueryWallet,resultQueryWallet)=>{
        if(errQueryWallet){
            console.error(errQueryWallet)
            finishDB(db)
            return res.status(500).json({error:'Error interno en el servidor no se pudo completar la consulta'})
        }
        else{
            finishDB(db)

            return res.status(200).json({success:'Consulta realizada',resultQueryWallet})
        }
    })
}