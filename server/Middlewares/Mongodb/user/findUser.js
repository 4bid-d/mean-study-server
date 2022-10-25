const USER = require("../../../Schemas/user/user"); 
const FORM_MESSAGES  = require("../../../config/formValidationMessages")

function findUser(req, res, next) {

    res.User = false 
    const { email } = req.body

    try {

        USER
        .findOne({email:email})
        .then((result)=>{
            if(result) res.User = result
            next()
        })
       
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = findUser