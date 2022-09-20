var express = require('express');
var router = express.Router();
const createJsonToken = require("../Middlewares/Jwt/createToken") 
const FORM_MESSAGES  = require("../config/formValidationMessages")
const saveUser =  require("../Middlewares/Mongodb/saveUser")
const findUser  = require("../Middlewares/Mongodb/findUser") 

router.post('/signup',createJsonToken,findUser, async function(req, res) {
  const DETAILS = req.body 
  try {    
    if(!DETAILS.password) throw FORM_MESSAGES.PASSWORD_IS_REQUIRED
    if(!DETAILS.email) throw FORM_MESSAGES.EMAIL_IS_REQUIRED
    if(!DETAILS.username) throw FORM_MESSAGES.USERNAME_IS_REQUIRED

    if(!res.existingUser) {
      await saveUser(req,res)
    }else throw FORM_MESSAGES.ALREADY_IN
  } catch (message) {
    res.json(
      {
        message:message
      }
    )
    return
  }
  
  res.json(
    {
      message :FORM_MESSAGES.SIGNEDIN_SUCCESSFULLY,
      token:res.Token
    }
    )
  });
  

  module.exports = router;
