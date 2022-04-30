const express = require('express');

// import controllers
const { getProductByID, getCategories, getProducts } = require('../controllers/product.controller.js');

// import validators
const router = express.Router();

router.get('/get-product/:productID', getProductByID)
router.get('/get-categories', getCategories)
router.get('/get-products', getProducts)

module.exports = router