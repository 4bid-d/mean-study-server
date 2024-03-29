const BadRequestError = require("../../../common/errors/bad-request-error");
const USER = require("../../../Schemas/user/user"); 

function allUsers(req,res,next) {   
    try {
        USER.find()
        .then((result)=>{
            if(result){
                res.users = result               
                next()
            }else{
                res.username = false           
                throw new BadRequestError("No user found.")
            }
        })
    } catch (error) {
        next(error)
    }
    
}

module.exports = allUsers