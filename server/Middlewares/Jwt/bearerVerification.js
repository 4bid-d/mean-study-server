const jwt = require('jsonwebtoken');
require('dotenv').config()
function bearerVerification (req,res,next){
    const AUTHORISATION_BEARER  = req.headers['authorization']
    const TOKEN = AUTHORISATION_BEARER.split(" ")[1] 
    if(!AUTHORISATION_BEARER || !TOKEN) {
        res.json({JsonWebTokenError: `Invalid token`})
        return
    }
    try {       
        const decodedUser = jwt.verify(TOKEN, process.env.SECRET_KEY);
        if(decodedUser){
            res.userDetail = decodedUser 
            next()
        } 
    } catch (message) {
        res.userDetail = false 
        res.json({JsonWebTokenError: `Invalid token`})
        return
    }
   
}

module.exports = bearerVerification