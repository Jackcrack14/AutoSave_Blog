const jwt = require('jsonwebtoken')

const protect = async(req,res,next) =>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token,process.JWT_SECRET)
            req.user = await User.findById(decoded.id).select("-password")
            (next)
        }catch (err){
            res.status(401)
            throw new Error("Token not authorized")
        }
    }
    if(!token){
        res.status(401);
        throw new Error("Not authorized, no token");
    }
}


module.exports ={protect}