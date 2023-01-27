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

// creating a new server
router.post('/',
bearerVerification,
createServer,
findServerReference,
addServerToUser,
function(req, res,next) {
    try {
      
        if(!res.createdServer) throw new BadRequestError("Cant Create Server.")
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
bearerVerification,
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
bearerVerification,
findServer,
CheckUserIsMemberOf,
returnAdminKey,
(req,res,next)=>{
  let { serverId } = req.params
  function deleteServer(){
    return new Promise((resolve , reject)=>{
      Server.findOneAndDelete({_id : serverId })
      .then(()=>{
        serverReference.findOneAndUpdate({username : res.userDetail.username},
          {$pull : {servers : serverId}})
          .then(()=>{
            resolve(true)
          })
          .catch(()=>{
            reject(false)
          })
      })
      .catch(()=>{
        reject(false)
      })
    })
  }
    try {
        if(!res.is_memberOf && !res.adminCred){
          throw new BadRequestError("invalid access")     
        }else{
          
          deleteServer()
          .then(()=>{
            res.json({success : true})     
          })
          .catch(()=>{
            res.json({success : false})     
          })
        }

    } catch (error) {
      next(error)
    }
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
