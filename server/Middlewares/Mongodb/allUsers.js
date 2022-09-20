const USER = require("../../Schemas/user"); 

async function allUsers(req,res,next) {
    let usernameArray = []
    try {
        USER.find()
        .then((result)=>{
            if(result){
                result.forEach(
                    (object)=>{
                        usernameArray.push(object.username)
                    }
               )
                console.log("1"+usernameArray)
                // responseObject.status = true  
                res.username = usernameArray
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