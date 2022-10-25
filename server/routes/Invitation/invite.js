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
function(req, res,next) {
  try {
      if(!res.requests) {
         throw new Error("No requests found").status = 301
      }else {
        res.json({Requests : res.requests })
      }
  } catch (error) {
    next(error)
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
function(req, res,next) {
  try {
      res.json({message:"request sent successfully."})
  } catch (error) {
    next(error)
  }
});


module.exports = router;
