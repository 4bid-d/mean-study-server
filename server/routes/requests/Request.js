var express = require('express');
var router = express.Router();
const bearerVerification = require('../../Middlewares/auth/bearerVerification');
const createOrUpdateRequest = require('../../Middlewares/Mongodb/Invitation/createRequest');
const findRequests = require('../../Middlewares/Mongodb/Invitation/findInvitation');
const findServer = require('../../Middlewares/Mongodb/server/findServerInstance');
const allUsers = require('../../Middlewares/Mongodb/user/allUsers');
const acceptOrRejectRequest = require('../../Middlewares/Mongodb/Invitation/acceptOrRejectRequest');
const BadRequestError = require('../../common/errors/bad-request-error');

router.get('/',
bearerVerification,
findRequests,
function(req, res,next) {
  try {
      if(!res.requests) {
         throw new BadRequestError("No requests found").status = 301
      }else {
        res.json({Requests : res.requests })
      }
  } catch (error) {
    next(error)
  }
});

router.get("/decision/:requestId",
bearerVerification,
findRequests,
acceptOrRejectRequest,
(req,res)=>{
  // console.log(decodeURIComponent(req.params.encodedData))

})

router.get('/:serverId',
bearerVerification,
findServer,
allUsers,
createOrUpdateRequest,
function(req, res,next) {
  try {
      res.json({message:"request sent successfully.",request : res.saveRequest})
  } catch (error) {
    next(error)
  }
});


module.exports = router;
