const INVITAION_MODEL = require("../../../Schemas/Invitaion/invitaionSchema"); 


class Request {
    constructor(username,{name,id}) {
        this.username = username;
        this.serverName = name;
        this.serverId = id
    }
  }


function createOrUpdateInvitaion(req, res, next){

    if(!res.userDetail || !res.Server ){
        console.log("returned")
        res.saveRequest = false
        next()
    }
    const adminDetails = res.users.filter((object)=>{
        return object.username === res.Server.admin
    })
    const NEW_REQUEST = new Request(res.userDetail.username,{
        name : res.Server.name,
        id : res.Server.serverId
    })
    if(res.userDetail && res.Server){

        INVITAION_MODEL.findOne({
            username : res.Server.admin
        })
        .then((result)=>{
            if(!result){
            console.log(NEW_REQUEST.serverId)
            const requestLetter = new INVITAION_MODEL({
                username:res.Server.admin,
                email : adminDetails[0].email,
                requests:[
                    {
                        by:NEW_REQUEST.username,
                        server: {
                            name : NEW_REQUEST.serverName,
                            id : NEW_REQUEST.serverId
                        }
                    }
                ]
            })
            console.log(requestLetter)
            requestLetter.save(()=>{
                res.saveRequest = true
                next()
            })
            }else{
            console.log("Founded")
            INVITAION_MODEL.updateOne({
                requests:[
                    ...result.requests,
                    {
                        by:NEW_REQUEST.username,
                        server: {
                            name : NEW_REQUEST.serverName,
                            id : NEW_REQUEST.serverId
                        }
                    }
                ]
            })
            .then((result)=>{
                res.saveRequest = true
                next()
            })
        }
        
    })
    
}
}
module.exports = createOrUpdateInvitaion 