var express = require('express');
var router = express.Router();
const verifyJsonToken =  require("../../Middlewares/Jwt/verify"); 
const createOrUpdateInvitaion = require('../../Middlewares/Mongodb/Invitation/createRequest');
const findServer = require('../../Middlewares/Mongodb/server/findServerInstance');
const allUsers = require('../../Middlewares/Mongodb/user/allUsers');

router.get('/:jsonToken/:serverId',
verifyJsonToken,
findServer,
allUsers,
createOrUpdateInvitaion,
async function(req, res) {
  try {
    if(!res.Server) throw "server not found"
    if(!res.saveRequest) throw "Cant Sent Request."
    else{
      res.json({message:"request sent successfully."})
    }
  } catch (error) {
    res.json({error: error})
  }
});

module.exports = router;
