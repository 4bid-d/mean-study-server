const jwt = require('jsonwebtoken');
const BadRequestError = require('../../common/errors/bad-request-error');
const NotAuthorizedError = require('../../common/errors/not-authorized-error');
require('dotenv').config()
function bearerVerification (req,res,next){
    let AUTHORISATION_BEARER ,TOKEN
    try {       

        if(req.headers['authorization']){
            AUTHORISATION_BEARER = req.headers['authorization']
            TOKEN = AUTHORISATION_BEARER.split(" ")[1] 
        }else {
            // res.userDetail = false 
            throw new BadRequestError("No token found, Please login and try again.")
        }
        const decodedUser = jwt.verify(TOKEN, process.env.SECRET_KEY);
        if(decodedUser){
            delete decodedUser.password
            res.userDetail = decodedUser
            next()
        }else{
            throw new NotAuthorizedError()
        }

    } catch (error) {
        // res.userDetail = false 
        next(error)
        return
    }
   
}

module.exports = bearerVerification