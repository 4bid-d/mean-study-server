const SERVER = require("../../../Schemas/server/server");
const addInvitaion = require("./helpers/acceptOrRejectHelper/addInvitation");
// const addJoinedServerToUserRefference = require("./helpers/acceptOrRejectHelper/addJoinedServerToUserRefference");
const deleteInvitation = require("./helpers/acceptOrRejectHelper/deleteInvitation");

function acceptOrRejectIvitation(req, res, next){

    try {
        const USER = res.userDetail      
        const {inviteID , decision} = JSON.parse(decodeURIComponent(req.params.encodedData))
        
        const FOUNDED_INVITATION = res.requests.find((object)=>{        
            return object.id === inviteID.toString()
        })
        
        if(!FOUNDED_INVITATION){
            throw new Error("cannot found inviataion")
        }
        
        // Delete the request
        deleteInvitation(FOUNDED_INVITATION,res.requests,USER.username)
        
        if(!decision){
            throw new Error("SuccessFully rejected the request.")
        }
        
        SERVER 
        .findOne({
            _id : FOUNDED_INVITATION.server.id
        })
        .then((result)=>{
            addInvitaion(FOUNDED_INVITATION,result,next)
        })
        .catch((error)=>{
            next(error)
        })

    } catch (error) {
       next(error)   
    }

}
module.exports = acceptOrRejectIvitation