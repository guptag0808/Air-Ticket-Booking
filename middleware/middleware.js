
const jwt=require("jsonwebtoken")

require('dotenv').config()

const authMiddleware=async(req,res,next)=>{
    try {
        const token=req.headers.authorization
        if(!token){
            res.status(401).send({msg:"User Not Found"})
        }

        const decoded=jwt.verify(token, process.env.JWT_NORMAL_TOKEN)
        const {userID}=decoded

        next()
    } catch (err) {
        return res.status(401).send({msg:"Not Authorized"})
    }
}

module.exports = {authMiddleware}
