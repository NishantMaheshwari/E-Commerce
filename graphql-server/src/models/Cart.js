const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },

    cartItem : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product'
    }
},
    {timestamps : true}
);

module.exports = mongoose.model("Cart",cartSchema);