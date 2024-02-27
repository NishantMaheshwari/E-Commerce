const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		// Define the email field with type String, required
		email: {
			type: String,
			required: true
		},
		// Define the password field with type String and required
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