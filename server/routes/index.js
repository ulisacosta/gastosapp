const express = require('express');
const router = express.Router();

const {add_wallet} = require('../controllers/wallet/add_wallet')
const {delete_wallet} = require('../controllers/wallet/delete_wallet');
const { login } = require('../controllers/login');
const { register } = require('../controllers/register');
const { add_transaction } = require('../controllers/transaction/add_transaction');
const { query_transaction } = require('../controllers/transaction/query_transaction');
const { query_wallet } = require('../controllers/wallet/query_wallet');

router.post('/login',login)


router.post('/add_wallet',add_wallet)

router.delete('/delete_wallet',delete_wallet)

router.post('/login',login)

router.post('/register',register)

router.post('/add_transaction/:id_transaction_type',add_transaction)


router.get('/query_transaction',query_transaction)

router.get('/query_wallet',query_wallet)


module.exports = router;
