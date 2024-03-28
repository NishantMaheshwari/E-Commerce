const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.auth = (req,res,next) => {
    try{
        
        // console.log('Entered auth middleware');
        // console.log(req.body);
        const token = req.body.token || req.header("Authorization");
        // console.log(token);
       
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'Token is missing',
            });
        }
       
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decode);
            req.user = decode;
            // console.log(req.user);
        }
        catch(err){
         
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