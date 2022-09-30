var express = require('express');
var router = express.Router();
const verifyJsonToken =  require("../../Middlewares/Jwt/verify"); 
const findServer = require('../../Middlewares/Mongodb/server/findServerInstance');

router.get('/:jsonToken/:serverId',
verifyJsonToken,
findServer,
async function(req, res) {
  try {
    console.log(res.userDetail)
    console.log(res.Server)
  } catch (error) {
    console.log("error")
  }
});

module.exports = router;
