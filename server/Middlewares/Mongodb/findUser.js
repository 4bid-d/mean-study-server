const USER = require("../../Schemas/user"); 

function findUser(req, res, next) {
    res.existingUser = false 
    try {
        USER.findOne(
            {
                email:req.body.email
            }
        ).then((result)=>{
            if(result){
                res.existingUser = result
                next()
            }else{
                res.existingUser = false
                next()
            }
        })
    } catch (message) {
        console.log(message)
    }
    
}

module.exports = findUser