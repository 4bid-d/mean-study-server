var express = require('express');
var router = express.Router();
const bearerVerification = require('../../Middlewares/Jwt/bearerVerification');
const createOrUpdateInvitation = require('../../Middlewares/Mongodb/Invitation/createRequest');
const findInvitaion = require('../../Middlewares/Mongodb/Invitation/findInvitation');
const findServer = require('../../Middlewares/Mongodb/server/findServerInstance');
const allUsers = require('../../Middlewares/Mongodb/user/allUsers');
const acceptOrRejectIvitation = require('../../Middlewares/Mongodb/Invitation/acceptOrRejectIvitation');

router.get('/',
bearerVerification,
findInvitaion,
function(req, res) {
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

router.get("/requestDecision/:encodedData",
bearerVerification,
findInvitaion,
acceptOrRejectIvitation,
(req,res)=>{
  // console.log(decodeURIComponent(req.params.encodedData))

})

router.get('/:serverId',
bearerVerification,
findServer,
allUsers,
createOrUpdateInvitation,
function(req, res) {
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
