const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    orderItems : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product'
    }],
    shippingAddress : {
        type : String,
        default : ''
    },
    totalPrice : {
        type : Number,
        required : true
    }
},
    {timestamps : true}
)

module.exports = mongoose.model('Order',orderSchema);