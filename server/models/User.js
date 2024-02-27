const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
	
		email: {
			type: String,
			required: true
		},
		
		password: {
			type: String,
			required: true
		},
        orders :[{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Order' ,
			default: []
        }],
		cart :[{
			type: mongoose.Schema.Types.ObjectId,
			ref:'Product',
			default: []
		}]
    },
    {timestamps: true}   
);

// Export the Mongoose model for the user schema, using the name "User"
module.exports = mongoose.model("User", userSchema);