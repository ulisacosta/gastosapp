const dbConnect = require("../../config/mysql");
const {finishDB} = require('../../util/finishDB');

module.exports.delete_wallet = (req,res)=>{
    const db = dbConnect()
    const {id_wallet} = req.body

    db.query('DELETE FROM wallet WHERE id_wallet = ? ',[id_wallet],(errDeleteWallet,result)=>{
        if(errDeleteWallet){
            console.log(errDeleteWallet);
            finishDB(db);
            return res.status(500).json({
                error: "Error interno del servidor no se pudo crear la billetera",
              });
        }
        else{
            console.log(id_wallet);
            finishDB(db);
            return res.status(204).json({ message: "Eliminado con éxito" });        }
    })

}