const BadRequestError = require("../../../common/errors/bad-request-error");
const SERVER = require("../../../Schemas/server/server");
const addInvitaion = require("./helpers/acceptOrRejectHelper/addInvitation");
// const addJoinedServerToUserRefference = require("./helpers/acceptOrRejectHelper/addJoinedServerToUserRefference");
const deleteInvitation = require("./helpers/acceptOrRejectHelper/deleteInvitation");

function acceptOrRejectIvitation(req, res, next){

    try {
        const USER = res.userDetail      
        const {inviteId } = req.params 
        var isDecisionIsTrue = (String(req.query["decision"]).toLowerCase() === 'true');
        const FOUNDED_INVITATION = res.requests.find((object)=>{        
            return object.id === inviteId.toString()
        })
        if(!FOUNDED_INVITATION){
            throw new BadRequestError("cannot found inviataion")
        }
        
        // Delete the request
        deleteInvitation(FOUNDED_INVITATION,res.requests,USER.username)
        
        if(!isDecisionIsTrue){
            res.json("SuccessFully rejected the request.")
            return
        }
        
        SERVER 
        .findOne({
            _id : FOUNDED_INVITATION.server.id
        })
        .then((result)=>{
            addInvitaion(FOUNDED_INVITATION,result,next)
            res.json("Successfully added ")
        })
        .catch((error)=>{
            next(error)
        })

    } catch (error) {
       next(error)   
    }

}



module.exports = acceptOrRejectIvitation