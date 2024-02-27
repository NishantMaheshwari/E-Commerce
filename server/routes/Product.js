const express = require('express');
const router = express.Router();
const {getProduct,getAllProducts} = require('../controllers/Product')

router.get('/getSpecificProduct', getProduct);
// router.post('/addProduct',addProduct);
router.get('/getAllProducts', getAllProducts);  

module.exports = router;