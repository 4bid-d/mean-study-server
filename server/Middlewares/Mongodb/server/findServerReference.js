const SERVER_REFERENCE = require("../../../Schemas/user/serverReference"); 

function findServerReference(req, res, next) {
    
    try {

            SERVER_REFERENCE
            .findOne({
                email:res.userDetail.email
            })
            .then((result)=>{
                
                // throw new Error("You dont have any server created")   
                if(result  === null){
                    res.existingReference = false
                    next()
                    return
                }
                res.existingReference = result
                next()

            })
      
    } catch (error) {
            next(error)
    }
    
}

module.exports = findServerReference