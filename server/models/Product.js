const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
	{
        name:  {
            type:String, 
            required:true
        }, 
        category: {
            type:String, 
            required:true
        },
        price:   {
            type:Number, 
            required:true
        },
        rating: {
            type:Number,
            required:true
        },
        description: {
            type:String, 
            required:true
        },
        image : {
            type:String, 
            required:true
        }
    },
    {timestamps: true}   
);

// Export the Mongoose model for the user schema, using the name "User"
module.exports = mongoose.model("Product", productSchema);