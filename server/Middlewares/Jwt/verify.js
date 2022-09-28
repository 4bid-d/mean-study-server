const jwt = require('jsonwebtoken');
require('dotenv').config()
function verifyJsonToken (req,res,next){


    if(!req.params.jsonToken) {
        console.log("error2")
        res.json({JsonWebTokenError: `Invalid token`})
        res.userDetail = false 
        next()
    }
    const TOKEN = req.params.jsonToken.toString() 
    try {       
        const decodedUser = jwt.verify(TOKEN, process.env.SECRET_KEY);
        decodedUser ? res.userDetail = decodedUser : res.userDetail = false 
        next()
    } catch (message) {
        res.userDetail = false 
        console.log("error1")
        next()
    }
   
}

module.exports = verifyJsonToken