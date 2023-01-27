const CustomError = require("./custom-error");

class NotFoundError extends CustomError{
    constructor(){
        super("not found")
    }
}

NotFoundError.prototype.statusCode = 404
NotFoundError.prototype.generateError = ()=>{
    return this.message
}
module.exports =  NotFoundError