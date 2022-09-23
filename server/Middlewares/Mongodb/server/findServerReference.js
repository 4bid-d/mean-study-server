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
                next()          
            }
            res.existingReference = result
            console.log(res.existingReference)
            next()
        }).catch((err)=>{
           console.log(err)
        })

       
    } catch (message) {
        console.log(message)
    }
    
}

module.exports = findServerReference