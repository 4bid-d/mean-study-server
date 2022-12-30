const SERVER_REFERENCE = require("../../../Schemas/user/serverReference"); 

function findServerReference(req, res, next) {
    try {

        SERVER_REFERENCE
            .findOne({
                email:res.userDetail.email
            })
            .populate({path:"servers",select:"name"})
            .populate({path:"joinedServers",select:"name"})
            .exec((err,result)=>{
                
                if(err){
                    res.existingReference = false
                    next()
                    return
                }
                result
                res.existingReference = result
                next()

            })
      
    } catch (error) {
            next(error)
    }
    
}

module.exports = findServerReference