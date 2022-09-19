var express = require('express');
var router = express.Router();
const createJsonToken = require("../Middlewares/Jwt/createToken") 
const FORM_MESSAGES  = require("../config/message")
const saveUser =  require("../Middlewares/Mongodb/saveUser")
const findUser  = require("../Middlewares/Mongodb/findUser") 

router.post('/signup',createJsonToken,findUser, async function(req, res) {
  const DETAILS = req.body 
  try {    
    if(!DETAILS.password) throw FORM_MESSAGES[0]
    if(!DETAILS.email) throw FORM_MESSAGES[1]
    if(!DETAILS.username) throw FORM_MESSAGES[2]
    console.log(res.existingUser)
    if(!res.existingUser) {
      await saveUser(req,res)
    }else throw FORM_MESSAGES[4]
  } catch (message) {
    res.json(
      {
        message:message
      }
    )
    return
  }
  console.log("fuck")
  res.json(
    {
      message :FORM_MESSAGES[3],
      token:res.Token
    }
    )
  });
  

  module.exports = router;
