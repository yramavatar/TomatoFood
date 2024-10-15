import jwt from "jsonwebtoken"

const authMiddleware = async(req,res,next)=>{
    // taking token from header and initilaise them
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorized Login Again"}) ; // if token dont get
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
         req.body.userId = token_decode.id;
         next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
        
    }

}

export default authMiddleware;
