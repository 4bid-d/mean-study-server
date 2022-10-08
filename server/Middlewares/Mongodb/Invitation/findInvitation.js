const INVITAION_MODEL = require("../../../Schemas/Invitaion/invitaionSchema"); 

function findInvitaion(req, res, next){

    const user = res.userDetail
    INVITAION_MODEL
    .findOne({
        username: res.userDetail.username
    })
    .then((result)=>{
        result ? res.requests = result.requests : res.requests = false  
        next()
    })
    .catch((error)=>{
        res.requests = false
        next()
    })

}
module.exports = findInvitaion