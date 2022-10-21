const validateCredentials = (req,res,next)=>{

    try {
        
        const DETAILS = req.body
        if(
            !DETAILS.password||
            !DETAILS.email||
            !DETAILS.username
        ){
            throw new Error("Please Provide all required credentials")
        }else{
            next()
        }
    } catch (error) {
        next(error)
    }
}

module.exports = validateCredentials