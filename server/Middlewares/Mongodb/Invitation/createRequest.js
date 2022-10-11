const INVITAION_MODEL = require("../../../Schemas/Invitaion/invitaionSchema"); 
const updateInvitation = require("./helpers/createRequestHelper/update")
const { v4: uuidv4 } = require('uuid');
const createInvitation = require("./helpers/createRequestHelper/create");
const findAdminDetails = require("./helpers/createRequestHelper/findAdminDetails");
const findExistingRequest = require("./helpers/createRequestHelper/findExistingRequest");

class Request {
    constructor(username,{name,id}) {
        this.username = username;
        this.serverName = name;
        this.serverId = id
        this.inviteId = uuidv4()
    }
  }

function createOrUpdateInvitation(req, res, next){
    
    if(!res.userDetail ||
    !res.Server ||
    res.userDetail.username == res.Server.admin
    ){
        res.saveRequest = false
        next()
    }
    
    /** All credentials and confirms that admin is not sending the request.**/
    
    if(res.userDetail &&
    res.Server &&
    res.userDetail.username !== res.Server.admin
    ){

        const adminDetails = findAdminDetails(res.users,res.Server.admin)
        
        const NEW_REQUEST = new Request(res.userDetail.username,{
            name : res.Server.name,
            id : res.Server.serverId
        })

        INVITAION_MODEL.findOne({
            username : res.Server.admin
        })
        .then((result)=>{
            if(!result){
                // Creating Invitation
                createInvitation(NEW_REQUEST , adminDetails,(result)=>{
                    res.saveRequest = true
                    next()
                })
            }else{

                const EXISTING_REQUEST = findExistingRequest(result.requests,NEW_REQUEST)

                if(EXISTING_REQUEST){
                    res.saveRequest = false
                    next() 
                }else { 
                    updateInvitation(result,NEW_REQUEST,(result)=>{
                        res.saveRequest = true
                        next()
                    })
                }
            }
        
        })
    
    }
}
module.exports = createOrUpdateInvitation 