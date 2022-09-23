var express = require('express');
var router = express.Router();
const createJsonToken = require("../Middlewares/Jwt/createToken") 
const FORM_MESSAGES  = require("../config/formValidationMessages")
const saveUser =  require("../Middlewares/Mongodb/user/saveUser")
const findUser  = require("../Middlewares/Mongodb/user/findUser") 
const allUsers = require("../Middlewares/Mongodb/user/allUsers")


router.post('/',createJsonToken,findUser,allUsers, async function(req, res) {
  const DETAILS = req.body 
  console.log(DETAILS.password)
  try {    
    if(!DETAILS.password) throw FORM_MESSAGES.SIGNUP.PASSWORD_IS_REQUIRED
    if(!DETAILS.email) throw FORM_MESSAGES.SIGNUP.EMAIL_IS_REQUIRED
    if(!DETAILS.username) throw FORM_MESSAGES.SIGNUP.USERNAME_IS_REQUIRED
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
    if(!res.existingUser) {
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
