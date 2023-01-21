const express = require('express');
const { getProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/products.controller');

const router = express.Router();

router.get('/products', getProducts);

router.post('/products', addProduct);

router.put('/products/:productId', updateProduct);

router.delete('/products/:productId', deleteProduct);

module.exports = router;