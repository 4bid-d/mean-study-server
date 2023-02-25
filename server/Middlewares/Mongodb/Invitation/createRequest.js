const INVITAION_MODEL = require("../../../Schemas/Invitaion/invitaionSchema"); 
const updateInvitation = require("./helpers/createRequestHelper/update")
const { v4: uuidv4 } = require('uuid');
const USER = require("../../../Schemas/user/user");
const BadRequestError = require("../../../common/errors/bad-request-error");

function findExistingRequest(requests,username , serverId){
    const existingRequest = requests.find((object)=>{
        return object.by ==  username &&  serverId == object.server.id
    })   
    console.log(existingRequest)
    return existingRequest ?? false  
}


function createOrUpdateInvitation(req, res, next){
    try {
        
        /** confirms All credentials and  that admin is not sending the request.**/
        const {admin } = res.Server
        const serverId  =  res.Server._id
        const serverName = res.Server.name
        const {username} = res.userDetail
        if(username == admin) throw new BadRequestError("You cant sent request to Your own server")
        const inviteId =  uuidv4()
            

        INVITAION_MODEL.findOne({
            username : admin
        })
        .then((existingDocument)=>{
            if(!existingDocument){
                USER.findOne({username:admin})
                .then((adminDetails)=>{
                    const requestLetter = new INVITAION_MODEL({
                        username:adminDetails.username,
                        email : adminDetails.email,
                        requests:[
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
                    requestLetter.save((result)=>{
                        res.saveRequest = inviteId
                        next()
                    })
                })    
                .catch((error)=>{
                    next(error)
                })
            }else{
                //Checking that the same request is send before 
                const EXISTING_REQUEST = findExistingRequest(existingDocument.requests,username,serverId)

                if(EXISTING_REQUEST){
                    throw new BadRequestError("Cant send request..")
                }else { 
                    //updating the request to request array
                    INVITAION_MODEL.updateOne({
                        username:existingDocument.username
                    },
                    {
                      $push : {
                        requests :  {
                            id : inviteId,
                            by:username,
                            server: {
                                name : serverName,
                                id : serverId          
                            }
                        }
                      }
                    })
                    .then(()=>{
                        res.saveRequest = inviteId
                        next()
                    })
                }
            }
        }) 
        .catch((error)=>{
            next(error)
        })       
        
    } catch (error) {
        next(error)
    }
}
module.exports = createOrUpdateInvitation 