var express = require('express');
var router = express.Router();
const createJsonToken = require("../Middlewares/Jwt/createToken") 
const  FORM_MESSAGES = require("../config/formValidationMessages")
const saveUser =  require("../Middlewares/Mongodb/user/saveUser")
const findUser  = require("../Middlewares/Mongodb/user/findUser") 
const allUsers = require("../Middlewares/Mongodb/user/allUsers");
const { API_MESSAGES } = require('../config/dataApiErrorMessage');


router.post('/',createJsonToken,findUser,allUsers, async function(req, res) {
  const DETAILS = req.body 
  const PASSWORD = DETAILS.password
  const EMAIL = DETAILS.email
  const USERNAME = DETAILS.username
  try {
  
    if(!PASSWORD) throw FORM_MESSAGES.SIGNUP.PASSWORD_IS_REQUIRED
    if(!EMAIL) throw FORM_MESSAGES.SIGNUP.EMAIL_IS_REQUIRED
    if(!USERNAME) throw FORM_MESSAGES.SIGNUP.USERNAME_IS_REQUIRED
    if(!res.Token) throw  FORM_MESSAGES.SIGNUP.PROVIDE_SUFFIECIENT_DETAILS

    if(!FORM_MESSAGES.SIGNUP.VALIDATION.REGEX.EMAIL_VALIDATION_REGEX.test(EMAIL.toString())) {
      if(!EMAIL.includes("@")) throw FORM_MESSAGES.SIGNUP.VALIDATION.EMAIL_VALIDATION.REQUIRED_SYMBOL
      if(!EMAIL.includes("mail"))  throw FORM_MESSAGES.SIGNUP.VALIDATION.EMAIL_VALIDATION.ENTER_VALID_ADDRESS
      if(!EMAIL.includes(".com")) throw FORM_MESSAGES.SIGNUP.VALIDATION.EMAIL_VALIDATION.COM_ERROR
      else throw  FORM_MESSAGES.SIGNUP.VALIDATION.EMAIL_VALIDATION.ENTER_VALID_ADDRESS
    }

    if(!FORM_MESSAGES.SIGNUP.VALIDATION.REGEX.PASSWORD_VALIDATION_REGEX.test(PASSWORD.toString())) {
      if(PASSWORD.length < 8) throw FORM_MESSAGES.SIGNUP.VALIDATION.PASSWORD_VALIDATION.MIN_LETTER_VALIDATION
      if(PASSWORD.length > 12) throw FORM_MESSAGES.SIGNUP.VALIDATION.PASSWORD_VALIDATION.MAX_LETTER_VALIDATION      
    }

    if(!FORM_MESSAGES.SIGNUP.VALIDATION.REGEX.USERNAME_VALIDATION_REGEX.test(USERNAME.toString())) throw  FORM_MESSAGES.SIGNUP.VALIDATION.USERNAME_VALIDATION.USERNAME_REGEX_VALIDATION

    
    if(res.User) throw FORM_MESSAGES.SIGNUP.ALREADY_IN 
    if(res.users) {
      for(let i =  0 ; i < res.users.length ; i++){
            if( res.users[i].username == DETAILS.username){
              throw FORM_MESSAGES.SIGNUP.USERNAME_NOT_AVAILABLE
            } 
            else{
            continue      
            }
          }
    } else {
      throw API_MESSAGES.USERNAME_API.UNABLE_TO_USERNAME
    }
    if(!res.User) {
      await saveUser(req,res)
    }else throw FORM_MESSAGES.SIGNUP.ALREADY_IN
  } catch (message) {
    res.json(
      {
        message:message,
        status:false
      }
    )
    return
  }
  res.json(
    {
      message :FORM_MESSAGES.SIGNUP.SIGNEDIN_SUCCESSFULLY,
      token:res.Token,
      status : true
    }
  )

  });
  

  module.exports = router;
