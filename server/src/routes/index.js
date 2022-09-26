const express = require('express')

const router = express.Router()

// Controller
const { addUsers, getUsers, getUser, updateUser, deleteUser } = require('../controllers/user')
const { getProduct, addProduct, getDetailProduct, updateProduct, deleteProduct } = require('../controllers/product')
const { getTransactions, addTransaction, notification } = require('../controllers/transaction')
const { register, login, checkAuth } = require('../controllers/auth')
const { getCategory, addCategory, deleteCategory, updateCategory, getDetailCategory } = require("../controllers/category");

// Middleware
const { auth } = require('../middlewares/auth')
// import middleware here
const {uploadFile} = require('../middlewares/uploadFile')

// Route
router.post('/user', addUsers)
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id',uploadFile("image"), updateUser)
router.delete('/user/:id', deleteUser)

router.get('/products', getProduct)
router.post('/product',auth, uploadFile("image"), addProduct) // place middleware before controller
router.get('/product/:id', getDetailProduct)
router.patch("/product/:id",uploadFile("image"), updateProduct);
router.delete("/product/:id",auth, deleteProduct);

router.get('/transactions', auth,  getTransactions)
router.post('/transaction', auth, addTransaction)

router.post('/register', register)
router.post('/login', login)
router.get("/check-auth", auth, checkAuth);

router.post('/notification', notification);

router.get('/categories', getCategory)
router.get('/category/:id', getDetailCategory)
router.post('/category', addCategory)
router.delete('/category/:id', deleteCategory)
router.patch('/category/:id', updateCategory)

module.exports = router