var express = require('express');
const bearerVerification = require('../../Middlewares/Jwt/bearerVerification');
var router = express.Router();

router.get('/',bearerVerification,async function(req, res, next) {
  try {
    res.userDetail ? res.json(res.userDetail) : null
  } catch (error) {
    res.json({JsonWebTokenError: `Invalid token`})
  }
});

module.exports = router;
