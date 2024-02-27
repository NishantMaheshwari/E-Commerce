const express = require('express');
const router = express.Router();
const {addOrder,getOrders} = require('../controllers/Order');
const {auth} = require('../middleware/auth');

router.post('/addProducts',auth,addOrder);
router.get('/getProducts',auth,getOrders);

module.exports = router;