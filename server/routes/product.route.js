const express = require('express');

// import controllers
const { getProductByID, getCategories, getProducts, getProductsOfCategory } = require('../controllers/product.controller.js');

// import validators
const router = express.Router();

router.get('/get-product/:productID', getProductByID)
router.get('/get-categories', getCategories)
router.post('/get-products', getProducts)
router.post('/get-products-of-category', getProductsOfCategory)

module.exports = router