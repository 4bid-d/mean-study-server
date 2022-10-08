var express = require('express');
const bearerVerification = require('../../Middlewares/Jwt/bearerVerification');
var router = express.Router();
const verifyJsonToken =  require("../../Middlewares/Jwt/verify"); 
const createOrUpdateInvitaion = require('../../Middlewares/Mongodb/Invitation/createRequest');
const findInvitaion = require('../../Middlewares/Mongodb/Invitation/findInvitation');
const findServer = require('../../Middlewares/Mongodb/server/findServerInstance');
const allUsers = require('../../Middlewares/Mongodb/user/allUsers');

router.get('/:jsonToken/:serverId',
verifyJsonToken,
findServer,
allUsers,
createOrUpdateInvitaion,
function(req, res) {
  // createOrUpdateInvitaion(req,res) ?   console.log("success") :  console.log("reject")
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

router.get('/all',
bearerVerification,
findInvitaion,
async function(req, res) {
  try {
      if(!res.requests) {
        res.json({error : true})
      }else {
        res.json({Requests : res.requests })
      }
  } catch (error) {
    res.json({error: error})
  }
});

module.exports = router;
