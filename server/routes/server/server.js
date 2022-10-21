var express = require('express');
var router = express.Router();
const addServerToUser = require('../../Middlewares/Mongodb/server/addServerReference');
const createServer = require('../../Middlewares/Mongodb/server/createServer.js');
const findServerReference = require('../../Middlewares/Mongodb/server/findServerReference');
const {SERVER_VALIDATION_MESSAGES} = require("../../config/serverCreationErr")
const {SERVER_REFERNCE} = require("../../config/dataApiErrorMessage");
const findServer = require('../../Middlewares/Mongodb/server/findServerInstance');
const bearerVerification = require('../../Middlewares/Jwt/bearerVerification');
let log = console.log

// creating a new server
router.post('/newServer',
bearerVerification,
createServer,
findServerReference,
addServerToUser,
function(req, res,next) {
    try {
      
        if(!res.createdServer) throw new Error("Cant Create Server.")
        // if (!res.registration)  throw SERVER_VALIDATION_MESSAGES.SOMETHING_WRONG_WITH_SERVER
        else{
          res
          .status(200)
          .json({message : "Server creation completed"})
        }

    } catch (error) {
        next(error)
    }

});

router.get('/serverReference',
bearerVerification,
findServerReference,
function( req, res, next) {
  try {

    if(!res.existingReference) throw new Error("You dont have any servers created.")
    else{
      // console.log(res.existingReference.servers)
      res.json( { data : res.existingReference } )
      return 
    }
  } catch (error) {
    next(error)
  }
});

// server details
router.get("/:serverId" ,
bearerVerification,
findServer,
(req,res,next)=>{

  try {
  
      let serverInstance = res.Server
      let user = res.userDetail
      
      const usernamefoundAsMember = serverInstance.members.find((username)=>{
        return username === user.username 
      })

      if(usernamefoundAsMember === undefined) {
        res.json( { redirect : `/invite/${serverInstance.serverId}` } )
        return 
      }else{
          res.json( { data : serverInstance } )
          return  
      }

      // log(res.Server.admin)
      // if(res.Server.admin !==  res.userDetail.username){
      //   serverInstance.adminAccess = false
      // }

  } catch (error) {
     next(error)
  }
})

// handlingcalls without server id's 
router.get("/",(req,res,next)=>{
  try {
    throw new Error("Cannot found the server specified or please specify a server.")
  } catch (error) {
    next(error)
  }
})

module.exports = router;
