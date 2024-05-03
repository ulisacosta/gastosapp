const express = require('express');
const router = express.Router();

const {add_wallet} = require('../controllers/add_wallet')
const {delete_wallet} = require('../controllers/delete_wallet');
const { login } = require('../controllers/login');
const { register } = require('../controllers/register');
const { add_transaction } = require('../controllers/add_transaction');

router.post('/login',login)


router.post('/add_wallet',add_wallet)

router.delete('/delete_wallet',delete_wallet)

router.post('/login',login)

router.post('/register',register)

router.post('/add_transaction/:id_transaction_type',add_transaction)




module.exports = router;
