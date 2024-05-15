const dbConnect = require("../../config/mysql");
const { finishDB } = require("../../util/finishDB");


module.exports.verify_transaction = (req, res) => {
    const db = dbConnect();
    
    const sqlVerifyTransaction= 'SELECT DISTINCT wallet.*, transaction.* FROM wallet JOIN transaction ON wallet.id_wallet = transaction.id_wallet WHERE transaction.amount > 0;'

    db.query(sqlVerifyTransaction,(errVerify,resultVerify)=>{
        if(errVerify){
            console.error(errVerify);
            finishDB(db);
            return res.status(500).json({
              error: "Error interno del servidor no se pudo realizar la consulta"
            });
        }
        else {
            finishDB(db)
           return res.status(200).json({message:'Consulta realizada',resultVerify})
        }
    })
}
