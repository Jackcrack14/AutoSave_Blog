const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
const protect = async(req,res,next) =>{
    let token;
    // console.log(req.headers.authorization)
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        // console.log('In')
        // console.log(req.headers.authorization)
        
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            // console.log(decoded)
            req.user = await User.findById(decoded.id).select("_id")
            // console.log(req.user)
            next()
        
            // res.status(401)
            // throw new Error("Token not authorized")
        
    }
    if(!token){
        res.status(401);
        throw new Error("Not authorized, no token");
    }
}


module.exports ={protect}