const express = require('express');
const { getCartDetails, addProductToCart, updateCart, deleteProductFromCart } = require('../controllers/cart.controller');

const router = express.Router();

router.get('/cart/:userId', getCartDetails);

router.post('/cart/:userId', addProductToCart);

router.put('/cart/:userId', updateCart);

router.delete('/cart/:userId/:productId', deleteProductFromCart);


module.exports = router;