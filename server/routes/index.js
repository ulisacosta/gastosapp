const express = require('express');
const router = express.Router();
const dbConnect = require("../config/mysql");
const {finishDB} = require('../util/finishDB');

const {add_wallet} = require('../controllers/add_wallet')
const {delete_wallet} = require('../controllers/delete_wallet')

router.post('/login',login)


router.post('/add_wallet',add_wallet)

router.delete('/delete_wallet',delete_wallet)




module.exports = router;
