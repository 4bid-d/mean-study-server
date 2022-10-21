const USER = require("../../../Schemas/user/user"); 
const FORM_MESSAGES  = require("../../../config/formValidationMessages")

function findUser(req, res, next) {
    res.User = false 
    try {
        USER.findOne(
            {
                email:req.body.email
            }
        ).then((result)=>{
            if(result){
                res.User = result
                next()
            }else{
                res.User = false
                next()
                // throw new Error(FORM_MESSAGES.LOGIN.NO_USER_FOUND)
            }
        })
        .catch((error)=>{
            next(error)
        })
    } catch (error) {
        next(error)
    }
    
}

module.exports = findUser