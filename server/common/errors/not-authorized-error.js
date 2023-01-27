const CustomError=  require("./custom-error");

class NotAuthorizedError extends CustomError{
    constructor(){
        super("not authorized")
    }
}

NotAuthorizedError.prototype.statusCode = 401
NotAuthorizedError.prototype.generateError = ()=>{
    return this.message 
}
module.exports =  NotAuthorizedError