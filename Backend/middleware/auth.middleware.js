const jwt = require('jsonwebtoken')

const authenticate = (req,res,next)=>{
    const authHead = req.header['authorization']
    console.log("authHead", authHead)
    const token = authHead && authHead.split(' ')[1]
    console.log("token", token)
    if(!token){
        return res.status(401).json({
            message:'Token required'
        })
    }
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        console.log("decode",decode)
        req.user = decode
        next()
    } catch{
        return res.status(401).json({
            message:'Invalid token'
        })
    }
}

module.exports = {authenticate}