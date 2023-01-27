const CustomError  = require( "../errors/custom-error");


module.exports = function errorHandler(error,req ,res ,next ){
    console.log(error.message)
    if(error instanceof CustomError ){
        return res.status(error.statusCode).json({ error:error.message})
    }

    res.status(500).json({error:'something went wrong'})
}