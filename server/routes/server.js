var express = require('express');
var router = express.Router();
const verifyJsonToken =  require("../Middlewares/Jwt/verify"); 
const addServerToUser = require('../Middlewares/Mongodb/server/addServerReference');
const createServer = require('../Middlewares/Mongodb/server/createServer');
const findServerReference = require('../Middlewares/Mongodb/server/findServerReference');

router.post('/:jsonToken/newServer',
verifyJsonToken,
createServer,
findServerReference,
addServerToUser,
function(req, res) {
  try {
    if(!res.userDetail) throw "Something went wrong Please login again"
    if(!res.createdServer || !res.registration) throw "Something went wrong in server."

  } catch (error) {
    res.json({message: error })
  }
});

module.exports = router;
