const jwt = require('jsonwebtoken');
require('dotenv').config()

const verifyJsonToken = async(req,res,next)=>{
    const DETAILS = req.params.jsonToken.toString() 
    try {        
        const decodedUser = jwt.verify(DETAILS, process.env.SECRET_KEY);
        decodedUser ? res.userDetail = decodedUser : res.userDetail = false 
    } catch (error) {
       res.json({JsonWebTokenError: `Invalid token`})
    }
    next()
}

module.exports = verifyJsonToken