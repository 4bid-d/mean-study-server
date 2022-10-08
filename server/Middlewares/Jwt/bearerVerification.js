const jwt = require('jsonwebtoken');
require('dotenv').config()
function bearerVerification (req,res,next){
    const TOKEN  = req.headers['authorization'].split(" ")[1]
    if(!TOKEN) {
        console.log("error2")
        res.json({JsonWebTokenError: `Invalid token`})
        res.userDetail = false 
        next()
    }
    try {       
        const decodedUser = jwt.verify(TOKEN, process.env.SECRET_KEY);
        decodedUser ? res.userDetail = decodedUser : res.userDetail = false 
        next()
    } catch (message) {
        res.userDetail = false 
        res.json({JsonWebTokenError: `Invalid token`})
        // next()
    }
   
}

module.exports = bearerVerification