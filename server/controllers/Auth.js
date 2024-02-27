const User = require("../models/User");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

exports.login = async (req, res) => {
	try {
		
		const { email, password } = req.body; 
		// console.log('Inside auth controller', req.body);
		
		if (!email || !password) {
			
			return res.status(400).json({
				success: false,
				message: `Please Fill up All the Required Fields`,
			});
		}

		
		const user = await User.findOne({ email });

		const atIndex = email.indexOf('@');
		const userName = email.slice(0, atIndex);

		
		if (!user) {
			const newUser = await User.create({
                email,
                password
            });
			const token = jwt.sign(
				{  userId: newUser._id},
				process.env.JWT_SECRET,
				{
					expiresIn: "6h",
				}
			);
            return res.status(200).json({
                success: true,
                message: "New User registered successfully",
				token,
				userName
            });
		}
	
		if (password === user.password) {
			const token = jwt.sign(
				{ userId: user._id},
				process.env.JWT_SECRET,
				{
					expiresIn: "6h",
				}
			);
			return res.status(200).json({
                success: true,
                message: "User signed in successfully",
				token,
				userName
            });
		} else {
			// console.log('Incorrect Password');
			return res.status(400).json({
				success: false,
				message: `Password is incorrect`,
			});
		}
	} catch (error) {
		console.error(error);
		
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});
	}
};