var express = require('express');
var router = express.Router();
const addServerToUser = require('../Middlewares/Mongodb/server/addServerReference');
const createServer = require('../Middlewares/Mongodb/server/createServer.js');
const findServerReference = require('../Middlewares/Mongodb/server/findServerReference');
const {SERVER_VALIDATION_MESSAGES} = require("../config/serverCreationErr")
const {SERVER_REFERNCE} = require("../config/dataApiErrorMessage");
const findServer = require('../Middlewares/Mongodb/server/findServerInstance');
const bearerVerification = require('../Middlewares/Jwt/bearerVerification');

router.post('/newServer',
bearerVerification,
createServer,
findServerReference,
addServerToUser,
function(req, res) {
  try {
    if(!res.userDetail) throw SERVER_VALIDATION_MESSAGES.SOMETHING_WRONG_WITH_LOGIN
    if(!res.createdServer || !res.registration) throw SERVER_VALIDATION_MESSAGES.SOMETHING_WRONG_WITH_SERVER
    if(!res.userDetail) throw  SERVER_REFERNCE.GET_REFERENCE.USER_NOT_FOUND
    if(!res.createdServer) throw SERVER_VALIDATION_MESSAGES.SERVER_CREATION_FAILED
    if (!res.registration)  throw SERVER_VALIDATION_MESSAGES.SOMETHING_WRONG_WITH_SERVER
    else throw "server Creation completed"

  } catch (message) {
    res.json({message: message })

  }
});

router.get('/serverReference',
bearerVerification,
findServerReference,
function(req, res) {
  try {
    if(!res.userDetail) throw SERVER_REFERNCE.GET_REFERENCE.USER_NOT_FOUND
    if(!res.existingReference) throw "You dont have any servers created."
    else{
      // console.log(res.existingReference.servers)
      res.json( { data : res.existingReference } )
      return 
    }
  } catch (error) {
    res.json({error: error })
  }
});

router.get("/:serverId" ,
bearerVerification,
findServer,
(req,res)=>{

  try {
    if(!res.userDetail) throw SERVER_REFERNCE.GET_REFERENCE.USER_NOT_FOUND
    if(!res.Server) throw "Invalid server requested."
    else{
    
      const usernamefoundAsMember = res.Server.members.filter((username)=>{
         return username === res.userDetail.username
      })

      if(!usernamefoundAsMember[0]) {
        res.json( { redirect : `/invite/${res.Server.serverId}` } )
        return 
      }
      res.json( { data : res.Server } )
      return 
    }
  } catch (error) {
    res.json({error: error })
  }
})
module.exports = router;
