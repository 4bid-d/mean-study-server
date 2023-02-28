var express = require('express');
var router = express.Router();
const addServerToUser = require('../../Middlewares/Mongodb/server/addServerReference');
const createServer = require('../../Middlewares/Mongodb/server/createServer.js');
const findServerReference = require('../../Middlewares/Mongodb/server/findServerReference');
const findServer = require('../../Middlewares/Mongodb/server/findServerInstance');
const bearerVerification = require('../../Middlewares/auth/bearerVerification');
const CheckUserIsMemberOf = require('../data/member');
const returnAdminKey = require('../../Middlewares/admin/controller');
const Server = require('../../Schemas/server/server');
const serverReference = require('../../Schemas/user/serverReference');
const BadRequestError = require('../../common/errors/bad-request-error');
const { default: mongoose } = require('mongoose');
const { ObjectId } = require('mongodb');
const addUserAsMember = require('../../Middlewares/Mongodb/Invitation/helpers/acceptOrRejectHelper/addUserAsMember');

// creating a new server
router.post('/',
createServer,
findServerReference,
addServerToUser,
function(req, res,next) {
    try {
      
        if(!res.createdServer) next(new BadRequestError("Cant Create Server."))
        // if (!res.registration)  throw SERVER_VALIDATION_MESSAGES.SOMETHING_WRONG_WITH_SERVER
        else{
          res
          .status(200)
          .json({message : "Server creation completed" ,server: res.createdServer})
        }

    } catch (error) {
        next(error)
    }

});

// server details
router.get("/:serverId" ,
findServer,
CheckUserIsMemberOf,
returnAdminKey,
(req,res,next)=>{

    try {
        let {_id} = res.Server
        if(!res.is_memberOf){
            res.json( { redirect : `/invite/${_id}` } )
            return 
        }else{
          
          let responseObj  =  {
            data :  res.Server 
          }
          res.json( responseObj )     
        }

    } catch (error) {
      next(error)
    }
})

router.delete("/:serverId" ,
findServer,
CheckUserIsMemberOf,
returnAdminKey,
(req,res,next)=>{
  let { serverId } = req.params
  let {is_memberOf ,adminCred, userDetail} = res
    try {
        if(!is_memberOf || !adminCred){
          next(new BadRequestError("invalid access"))     
        }else{
          Server.findOneAndDelete({_id : serverId })
          .then(()=>{
            serverReference.findOneAndUpdate({username : userDetail.username},
              {$pull : {servers : serverId}})
              .then(()=>{
                res.json({success : true})     
              })
              .catch(()=>{
                res.json({success : false})     
              })
          })
    }
   } catch (error) {
      next(error)
    }
})

// creating invitaion link for severs
router.get("/:serverId/create-link/:adminkey",
findServer,
CheckUserIsMemberOf,
returnAdminKey,
(req,res,next)=>{
  let {is_memberOf ,adminCred, userDetail,server} = res
  let adminKey = req.params.adminkey
  let serverId= req.params.serverId
  let inviteLinkId = mongoose.Types.ObjectId() 
  
  if(!is_memberOf || !adminCred) next(new BadRequestError("invalid access"))
  if(adminCred.equals(adminKey)) {
    Server.findOneAndUpdate(
      {_id : serverId},
      {
        link: inviteLinkId
      }
    )
    .then(()=>{
      res.json({
        message : "successFUlly created invitation link",
        link : `server/invite/${inviteLinkId}`
      })
    })
    .catch(()=>{
      next(new Error())
    })
  }
})

// adding members through invite link
router.get("/invite/:inviteId",(req,res,next)=>{
  let inviteId = req.params.inviteId
  let {username}= res.userDetail
  if(!ObjectId.isValid(inviteId)) next(new BadRequestError("NO invite id specified")) 
  Server.findOne({
    link:new ObjectId(inviteId)
  }).then((doc)=>{
    if(!doc) next(new BadRequestError("expired link"))
    else{
      addUserAsMember({
        user:username,
        serverId:doc._id
      },doc,next)
      if(res.success){
        res.json({message : res.success})
      }
    }
  })
})
// handlingcalls without server id's 
router.get("/",(req,res,next)=>{
  try {
    throw new BadRequestError("Cannot found the server specified or please specify a server.")
  } catch (error) {
    next(error)
  }
})


module.exports = router 
