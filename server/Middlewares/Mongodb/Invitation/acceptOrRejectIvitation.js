const INVITAION_MODEL = require("../../../Schemas/Invitaion/invitaionSchema"); 

function acceptOrRejectIvitation(req, res, next){

    const USER = res.userDetail
    const {inviteID , decision} = JSON.parse(decodeURIComponent(req.params.encodedData))
    const  FOUNDED_INVITATION = res.requests
    console.log(USER)
    console.log(inviteID , decision)
    // console.log(obj)
    console.log(FOUNDED_INVITATION)
    // INVITAION_MODEL
    // .findOne({
    //     username: res.userDetail.username
    // })
    // .then((result)=>{
    //     result ? res.requests = result.requests : res.requests = false  
    //     next()
    // })
    // .catch((error)=>{
    //     res.requests = false
    //     next()
    // })

}
module.exports = acceptOrRejectIvitation