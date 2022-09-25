const SERVER_REFERENCE = require("../../../Schemas/user/serverReference"); 

function findServerReference(req, res, next) {
    
    if( !res.userDetail ) {
        res.existingReference = false 
        next()
    } 
    try {
        SERVER_REFERENCE
        .findOne({
            email:res.userDetail.email
        }).then((result)=>{
            if(!result) {
             
                res.existingReference = false
                throw "Cant find refference"   
            }
            console.log("refference found")
            res.existingReference = result
            next()
        }).catch((err)=>{
           console.log(err)
           next()
        })
      
    } catch (message) {
        console.log(message)
        next()
    }
    
}

module.exports = findServerReference