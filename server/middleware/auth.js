const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.auth = (req,res,next) => {
    try{
        //extract token
        // console.log('Entered auth middleware');
        // console.log(req.body);
        const token = req.body.token || req.header("Authorization");
        // console.log(token);
        //if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'Token is missing',
            });
        }

        //verify the token
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decode);
            req.user = decode;
            // console.log(req.user);
        }
        catch(err){
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }catch(error) {  
        return res.status(401).json({
        success:false,
        message:'Something went wrong while validating the token',
    });
    }
} 