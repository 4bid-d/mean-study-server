const USER = require("../../../Schemas/user/user"); 

function findUser(req, res, next) {
    res.User = false 
    try {
        USER.findOne(
            {
                email:req.body.email
            }
        ).then((result)=>{
            if(result){
                res.User = result
                next()
            }else{
                res.User = false
                next()
            }
        })
    } catch (message) {
        console.log(message)
    }
    
}

module.exports = findUser