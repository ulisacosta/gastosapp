const express = require('express');
const router = express.Router();
const dbConnect = require("../config/mysql");
const {finishDB} = require('../util/finishDB');

const {add_wallet} = require('../controllers/add_wallet')
const {delete_wallet} = require('../controllers/delete_wallet')

router.get('/',(req,res)=>{
    const db =  dbConnect();
    const { user, password } = req.body
    db.query('SELECT users.user, users.password FROM users WHERE user = ? && password = ?',[user,password], (err,result)=>{
        if(err){
            console.log(err);
            finishDB(db);
        }
        else{

            console.log(result);
            finishDB(db);
        }
     
    })
    

})


router.post('/add_wallet',add_wallet)

router.delete('/delete_wallet',delete_wallet)




module.exports = router;
