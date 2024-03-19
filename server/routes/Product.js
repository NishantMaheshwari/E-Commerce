const express = require('express');
const router = express.Router();
const {getProduct,getAllProducts,getAllProductIds} = require('../controllers/Product')

router.get('/getSpecificProduct', getProduct);
// router.post('/addProduct',addProduct);
router.get('/getAllProducts', getAllProducts);  
router.get('/getAllProductIds',getAllProductIds);

module.exports = router;