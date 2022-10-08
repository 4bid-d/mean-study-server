const jwt = require('jsonwebtoken');
require('dotenv').config()
function bearerVerification (req,res,next){
    const TOKEN  = req.headers['authorization']
    console.log(TOKEN)
    if(!TOKEN) {
        res.json({JsonWebTokenError: `Invalid token`})
        return
    }
    try {       
        const decodedUser = jwt.verify(TOKEN.split(" ")[1] , process.env.SECRET_KEY);
        if(decodedUser){
            res.userDetail = decodedUser 
            next()
        } 
    } catch (message) {
        res.userDetail = false 
        res.json({JsonWebTokenError: `Invalid token`})
    }
   
}

module.exports = bearerVerification