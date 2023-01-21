const express = require('express');
const { getCategories, addCategory } = require('../controllers/categories.controller');

const router = express.Router();

router.get('/categories', getCategories);

router.post('/categories', addCategory);


module.exports = router;