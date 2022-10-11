const INVITAION_MODEL = require("../../../../Schemas/Invitaion/invitaionSchema")

function updateInvitation(ALL_REQUESTS,
    {username,inviteId,serverName,serverId},
    callback
    ){
    
    INVITAION_MODEL.updateOne({
        username:ALL_REQUESTS.username
    },
    {
    requests:[
        ...ALL_REQUESTS.requests,
        {
            id : inviteId,
            by:username,
            server: {
                name : serverName,
                id : serverId
                
            }
        }
    ]
})
.then((result)=>{
    callback(result)
    // res.saveRequest = true
    // next()
})
}

module.exports = updateInvitation