const BadRequestError = require("../../../common/errors/bad-request-error")

const validateCredentials = (req,res,next)=>{

    try {
        
        const {password ,email ,username} = req.body 
        if(
            !password||
            !email||
            !username
        ){
            throw new BadRequestError("Please Provide all required credentials")
        }else{
            next()
        }
    } catch (error) {
        next(error)
    }
}

module.exports = validateCredentials