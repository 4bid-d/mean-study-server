var express = require('express');
var router = express.Router();
const verifyJsonToken =  require("../Middlewares/Jwt/verify"); 
const addServerToUser = require('../Middlewares/Mongodb/server/addServerReference');
const createServer = require('../Middlewares/Mongodb/server/createServer.js');
const findServerReference = require('../Middlewares/Mongodb/server/findServerReference');
const {SERVER_VALIDATION_MESSAGES} = require("../config/serverCreationErr")
const {SERVER_REFERNCE} = require("../config/dataApiErrorMessage")

router.post('/:jsonToken/newServer',
verifyJsonToken,
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

router.get('/:jsonToken/serverReference',
verifyJsonToken,
findServerReference,
function(req, res) {
  try {
    if(!res.userDetail) throw SERVER_REFERNCE.GET_REFERENCE.USER_NOT_FOUND
    if(!res.existingReference) throw "You dont have any servers created."
    else{
      console.log(res.existingReference.servers)
      res.json( { data : res.existingReference } )
      return 
    }
  } catch (error) {
    res.json({error: error })
  }
});

module.exports = router;
