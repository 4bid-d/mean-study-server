var express = require('express');
var router = express.Router();
const log = require("../Middlewares/Jwt/createToken") 
const FORM_MESSAGES  = require("../config/message")


router.get('/', function(req, res, next) {

  res.json({message : "welcme"});
});

router.get('/home', function(req, res, next) {
  res.json({message : "Welcome to home"});
});

router.post('/login', function(req, res, next) {
console.log("arrived")
});

router.post('/signup',log, function(req, res) {
  const DETAILS = req.body 
  try {    
    if(!DETAILS.password) throw FORM_MESSAGES[0]
    if(!DETAILS.email) throw FORM_MESSAGES[1]
    if(!DETAILS.username) throw FORM_MESSAGES[2]
    res.json(
      {
        message :FORM_MESSAGES[3],
        token:res.Token
      }
    )
  } catch (message) {
    res.json(
      {
        message:message
      }
    )
  }
});

module.exports = router;
