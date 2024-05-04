const dbConnect = require("../../config/mysql");
const {finishDB} = require('../../util/finishDB');

module.exports.add_wallet = (req,res)=>{
    const db = dbConnect()
    const {wallet_name} = req.body

    db.query('INSERT INTO wallet VALUES (NULL,?)',[wallet_name],(errAddWallet,result)=>{
        if(errAddWallet){
            console.log(errAddWallet);
            finishDB(db);
        }
        console.log(wallet_name);
        finishDB(db);
    })

}