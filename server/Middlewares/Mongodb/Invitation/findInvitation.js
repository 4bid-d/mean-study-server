const BadRequestError = require("../../../common/errors/bad-request-error");
const INVITAION_MODEL = require("../../../Schemas/Invitaion/invitaionSchema"); 
log = console.log
function findInvitaion(req, res, next){

    const {username} = res.userDetail
    INVITAION_MODEL
    .findOne({
        username: username
        
    })
    .then((result)=>{ 
        if(!result) throw new BadRequestError("Cannot find any invitaion.")
        res.requests = result.requests   
        next()
    })
    .catch((error)=>{
        next(error)
    })

}
module.exports = findInvitaion