const INVITAION_MODEL = require("../../../Schemas/Invitaion/invitaionSchema"); 

function findInvitaion(req, res, next){

    const {username} = res.userDetail
    console.log(username)
    INVITAION_MODEL
    .findOne({
        username: username
    })
    .then((result)=>{
        if(!result) throw new Error("Cannot find any invitaion.")
        res.requests = result.requests   
        next()
    })
    .catch((error)=>{
        next(error)
    })

}
module.exports = findInvitaion