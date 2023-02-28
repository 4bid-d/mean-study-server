const BadRequestError = require("../../../common/errors/bad-request-error");
const SERVER = require("../../../Schemas/server/server");
const addUserAsMember = require("./helpers/acceptOrRejectHelper/addUserAsMember");
// const addJoinedServerToUserRefference = require("./helpers/acceptOrRejectHelper/addJoinedServerToUserRefference");
const deleteRequest = require("./helpers/acceptOrRejectHelper/deleteRequest");

function acceptOrRejectRequest(req, res, next){

    try {
        const USER = res.userDetail      
        const {requestId } = req.params 
        var isDecisionIsTrue = (String(req.query["decision"]).toLowerCase() === 'true');
        const FOUNDED_REQUEST = res.requests.find((object)=>{        
            return object.id === requestId.toString()
        })
        if(!FOUNDED_REQUEST){
            throw new BadRequestError("cannot found inviataion")
        }
        
        // Delete the request
        deleteRequest(FOUNDED_REQUEST,res.requests,USER.username)
        
        if(!isDecisionIsTrue){
            res.json("SuccessFully rejected the request.")
            return
        }
        
        SERVER 
        .findOne({
            _id : FOUNDED_REQUEST.server.id
        })
        .then((result)=>{
            addUserAsMember({
                user : FOUNDED_REQUEST.by,
                serverId :  FOUNDED_REQUEST.server.id
            },result,next)
            res.json("Successfully added ")
        })
        .catch((error)=>{
            next(error)
        })

    } catch (error) {
       next(error)   
    }

}



module.exports = acceptOrRejectRequest