const CustomError=  require("./custom-error");

class DatabaseConnectionError extends CustomError{
    constructor(){
        super("db connection error")
    }
}

DatabaseConnectionError.prototype.statusCode = 500
DatabaseConnectionError.prototype.generateError = ()=>{
    return this.message 
}
module.exports =  DatabaseConnectionError