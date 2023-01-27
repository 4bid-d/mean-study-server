const INVITAION_MODEL = require("../../../Schemas/Invitaion/invitaionSchema"); 
const updateInvitation = require("./helpers/createRequestHelper/update")
const { v4: uuidv4 } = require('uuid');
const createInvitation = require("./helpers/createRequestHelper/create");
const findExistingRequest = require("./helpers/createRequestHelper/findExistingRequest");
const USER = require("../../../Schemas/user/user");
const BadRequestError = require("../../../common/errors/bad-request-error");

class Request {
    constructor(username,{name,id}) {
        this.username = username;
        this.serverName = name;
        this.serverId = id
        this.inviteId = uuidv4()
    }
  }

function createOrUpdateInvitation(req, res, next){
    try {
        
        /** confirms All credentials and  that admin is not sending the request.**/
        const {admin , name ,_id} = res.Server
        const {username} = res.userDetail
        if(username == admin) throw new BadRequestError("You cant sent request to Your own server")
        let  adminDetails 
        USER
        .findOne({username:admin})
        .then((result)=>{
            adminDetails = result
        })    
        .catch((error)=>{
            next(error)
        })
            
        const NEW_REQUEST = new Request(username,{
            name : name,
            id : _id
        })

        INVITAION_MODEL.findOne({
            username : admin
        })
        .then((result)=>{
            console.log(result)
            if(!result){
                // Creating request and saving in database
                createInvitation(NEW_REQUEST , adminDetails,(result)=>{
                    res.saveRequest = true
                    next()
                })
            }else{
                //Checking that the same request is send before 
                const EXISTING_REQUEST = findExistingRequest(result.requests,NEW_REQUEST)

                if(EXISTING_REQUEST){
                    throw new BadRequestError("Cant send request..")
                }else { 
                    //updating the request to request array
                    updateInvitation(result,NEW_REQUEST,(result)=>{
                        res.saveRequest = true
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