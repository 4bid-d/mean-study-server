const INVITAION_MODEL = require("../../../Schemas/Invitaion/invitaionSchema"); 
const { v4: uuidv4 } = require('uuid');

class Request {
    constructor(username,{name,id}) {
        this.username = username;
        this.serverName = name;
        this.serverId = id
        this.inviteId = uuidv4()
    }
  }


function createOrUpdateInvitaion(req, res, next){

    if(!res.userDetail || !res.Server ||  res.userDetail.username == res.Server.admin){
        console.log("returned")
        res.saveRequest = false
        next()
    }
    
    if(res.userDetail && res.Server && res.userDetail.username !== res.Server.admin){

        const adminDetails = res.users.filter((object)=>{
            return object.username === res.Server.admin
        })
        
        const NEW_REQUEST = new Request(res.userDetail.username,{
            name : res.Server.name,
            id : res.Server.serverId
        })

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
                            id : NEW_REQUEST.inviteId,
                            by:NEW_REQUEST.username,
                            server: {
                                name : NEW_REQUEST.serverName,
                                id : NEW_REQUEST.serverId
                            }
                        }
                    ]
                })
            // console.log(requestLetter)
                requestLetter.save(()=>{
                    res.saveRequest = true
                    // return true
                    next()
                })
            }else{

                const EXISTING_REQUEST = result.requests.filter((object)=>{
                    return object.by == NEW_REQUEST.username && object.server.name ==  NEW_REQUEST.serverName
                })   

                if(EXISTING_REQUEST[0]){
                    res.saveRequest = false
                    next() 
                }else {
                    INVITAION_MODEL.updateOne({
                        requests:[
                            ...result.requests,
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
                    .then((result)=>{
                        res.saveRequest = true
                        next()
                    })
                }
            }
        
        })
    
    }
}
module.exports = createOrUpdateInvitaion 