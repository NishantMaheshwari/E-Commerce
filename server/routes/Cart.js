const express = require('express');
const router = express.Router();
const {getCart,addToCart,removeFromCart,emptyCart} = require('../controllers/Cart');
const {auth} = require('../middleware/auth');

router.get('/getCart',auth,getCart);
router.post('/addProduct',auth,addToCart);
router.post('/removeProduct',auth,removeFromCart);
router.post('/emptyCart',auth,emptyCart);

module.exports = router;