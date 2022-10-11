const INVITAION_MODEL = require("../../../Schemas/Invitaion/invitaionSchema"); 
const updateInvitation = require("./helpers/update")
const { v4: uuidv4 } = require('uuid');
const createInvitation = require("./helpers/create");

class Request {
    constructor(username,{name,id}) {
        this.username = username;
        this.serverName = name;
        this.serverId = id
        this.inviteId = uuidv4()
    }
  }

/**
 * Takes and returns the matching
 * admin from the given user array.
 */
function findAdminDetails(Users, username){
    return Users.find((object)=>{
        return object.username === username
    })
}
/* to find request do already exists
   and return boolean.
*/
function findExistingRequest(requests,NEW_REQUEST){
    const existingRequest = requests.find((object)=>{
        return object.by == NEW_REQUEST.username && object.server.name ==  NEW_REQUEST.serverName
    })   
    return existingRequest ?? false  
}

function createOrUpdateInvitation(req, res, next){

    console.log(res.Server)
    
    if(!res.userDetail ||
    !res.Server ||
    res.userDetail.username == res.Server.admin
    ){
        console.log("returned")
        res.saveRequest = false
        next()
    }
    
    /** 
      All credentials and confirms
      that admin is not sending the request.
    **/
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
                console.log(NEW_REQUEST.serverId)
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