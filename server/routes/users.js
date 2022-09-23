var express = require('express');
var router = express.Router();
const verifyJsonToken =  require("../Middlewares/Jwt/verify")

router.get('/:jsonToken',verifyJsonToken,async function(req, res, next) {
  try {
    res.userDetail ? res.json(res.userDetail) : null
  } catch (error) {
    res.json({JsonWebTokenError: `Invalid token`})
  }
});

module.exports = router;
