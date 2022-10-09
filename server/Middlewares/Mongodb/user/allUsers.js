const USER = require("../../../Schemas/user/user"); 

function allUsers(req,res,next) {   

    let userArray = []
    try {
        USER.find()
        .then((result)=>{
            if(result){
                result
                .forEach((object)=>{
                        userArray.push(object)
                    }
               )
                // responseObject.status = true  
                res.users = userArray
               
                next()
            }else{
                res.username = false           
                next()
            }
        })
    } catch (message) {
        console.log(message)
    }
    
}

module.exports = allUsers