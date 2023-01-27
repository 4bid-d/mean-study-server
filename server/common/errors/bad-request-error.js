const CustomError=  require("./custom-error");

class BadRequestError extends CustomError{
    constructor(message){
        super(message)
    }
}

BadRequestError.prototype.statusCode = 400
BadRequestError.prototype.generateError = ()=>{
    return this.message 
}
module.exports =  BadRequestError