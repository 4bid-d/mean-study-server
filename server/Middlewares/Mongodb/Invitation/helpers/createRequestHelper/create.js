const INVITAION_MODEL = require("../../../../../Schemas/Invitaion/invitaionSchema")

/**
 * Save the new request by 
 * taking in admin details and 
 * new request object 
 */
function createInvitation(NEW_REQUEST , adminDetails ,callback){

    // console.log(adminDetails)
    const requestLetter = new INVITAION_MODEL({
        username:adminDetails.username,
        email : adminDetails.email,
        requests:[
            {
                id : NEW_REQUEST.inviteId,
                by:NEW_REQUEST.username,
                server: {
                    name : NEW_REQUEST.serverName,
                    id : NEW_REQUEST.serverId
                }
            }
        ]
    })
    requestLetter.save((result)=>{
        callback(result)
    })
}

module.exports = createInvitation