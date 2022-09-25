const jwt = require('jsonwebtoken');
require('dotenv').config()

const verifyJsonToken = async(req,res,next)=>{

    if(!req.params.jsonToken) {
        res.userDetail = false 
        next()
    }
    const TOKEN = req.params.jsonToken.toString() 
    try {        
        const decodedUser = jwt.verify(TOKEN, process.env.SECRET_KEY);
        decodedUser ? res.userDetail = decodedUser : res.userDetail = false 
        console.log("user found")
    } catch (message) {
       console.log("user not found")
       res.json({JsonWebTokenError: `Invalid token`})
       return
    }
    next()
}

module.exports = verifyJsonToken