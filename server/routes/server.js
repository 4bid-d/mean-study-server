var express = require('express');
var router = express.Router();
const verifyJsonToken =  require("../Middlewares/Jwt/verify"); 
const addServerToUser = require('../Middlewares/Mongodb/server/addServerReference');
const createServer = require('../Middlewares/Mongodb/server/createServer.js');
const findServerReference = require('../Middlewares/Mongodb/server/findServerReference');
const {SERVER_VALIDATION_MESSAGES} = require("../config/serverCreationErr")

router.post('/:jsonToken/newServer',
verifyJsonToken,
createServer,
findServerReference,
addServerToUser,
function(req, res) {
  try {
    // if(!res.userDetail) throw SERVER_VALIDATION_MESSAGES.SOMETHING_WRONG_WITH_LOGIN
    // if(!res.createdServer || !res.registration) throw SERVER_VALIDATION_MESSAGES.SOMETHING_WRONG_WITH_SERVER
    if(!res.userDetail) throw "user Not found"
    if(!res.createdServer) throw "server creation cannot completed."
    if (!res.registration)  throw "user registration cannot completed."
    else throw "server Creation completed"

  } catch (message) {
    res.json({message: message })
    // console.log(error)
  }
});

module.exports = router;
