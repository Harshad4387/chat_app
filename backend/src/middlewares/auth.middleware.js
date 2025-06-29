const jwt = require('jsonwebtoken');
const User = require("../models/user.model.js");

const verifyjwt = async (req,res,next)=>{
    try {
         const token = req.cookies.jwt;
    
         if(!token){
            return res.status(401).json({message : "Unauthorized : token not provided"});
         }
    
         const decoded = await jwt.verify(token , process.env.JWT_TOKEN_SECERT);
         if(!decoded){
            return res.status(401).json({message : "Unauthorized : invalid token"});
         }
    
         const user = await User.findById(decoded.userid).select("-password");
         if(!user){
            return res.status(404).json({message : "user not found"});
         }
         req.user = user;
         next();
    } catch (error) {
        console.log("error in auth middleware" , error.message);
        res.status(500).json("internal server error");   
    }
}

module.exports  = verifyjwt;