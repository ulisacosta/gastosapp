const express = require('express');
const router = express.Router();

const {add_wallet} = require('../controllers/wallet/add_wallet')
const {delete_wallet} = require('../controllers/wallet/delete_wallet');
const { login } = require('../controllers/login/login');
const { register } = require('../controllers/login/register');
const { logout } = require('../controllers/login/logout');
const { add_transaction } = require('../controllers/transaction/add_transaction');
const { query_transaction } = require('../controllers/transaction/query_transaction');
const { query_wallet } = require('../controllers/wallet/query_wallet');
const { verify_transaction } = require('../controllers/transaction/verify_transaction');
const { isAuthenticated } = require('../middlewares/isAuthentic');

router.post('/login',login)
router.post('/register',register)
router.get('/logout',logout)


/* AGREGAR BILLETERA */
router.post('/add_wallet',isAuthenticated,add_wallet)

/* BORRAR BILLETERA */
router.delete('/delete_wallet',isAuthenticated,delete_wallet)

/* AGREGAR NUEVO INGRESO O GASTO */
/* ADD NEW INCOME OR EXPENSE */
router.post('/add_transaction/:id_transaction_type',isAuthenticated,add_transaction)

/* CONSULTA PARA MOSTRAR TODOS LOS GASTOS O INGRESOS */
/* QUERY FOR SHOW ALL EXPENSES OR INCOMES */
router.get('/query_transaction',isAuthenticated,query_transaction)

/* MUESTRA TODAS LAS BILLETERAS */
/* QUERY FOR SHOW ALL WALLETS */
router.get('/query_wallet',isAuthenticated,query_wallet)

/* CONSULTA PARA SABER SI TIENE PLATA LA BILLETERA Y NO ESTA VACÍA */
/* QUERY TO KNOW IF THE WALLET IS NOT EMPTY */
router.get('/verify_transaction',isAuthenticated,verify_transaction)


module.exports = router;
