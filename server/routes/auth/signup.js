var express = require('express');
var router = express.Router();
const createJsonToken = require("../../Middlewares/auth/createToken") 
const  FORM_MESSAGES = require("../../config/formValidationMessages")
const saveUser =  require("../../Middlewares/Mongodb/user/saveUser")
const findUser  = require("../../Middlewares/Mongodb/user/findUser") 
const allUsers = require("../../Middlewares/Mongodb/user/allUsers");
const { API_MESSAGES } = require('../../config/dataApiErrorMessage');
const validateCredentials = require('./helpers/valdate');
const validationSignup = require('./helpers/signupValidation');
const BadRequestError = require('../../common/errors/bad-request-error');


router.post('/',
validateCredentials,
findUser,
createJsonToken,
allUsers, async function(req, res,next) {
  const {password ,email ,username} = req.body 

  try {
    
        validationSignup(password,email,username)

        if(res.User) throw new BadRequestError(FORM_MESSAGES.SIGNUP.ALREADY_IN) 
        if(res.users) {
            for(let i =  0 ; i < res.users.length ; i++){
                  if( res.users[i].username == username){
                    throw new BadRequestError(FORM_MESSAGES.SIGNUP.USERNAME_NOT_AVAILABLE)
                  } 
                  else{
                    continue      
                  }
            }
        } else {
            throw new BadRequestError(API_MESSAGES.USERNAME_API.UNABLE_TO_USERNAME)
        }

        if(!res.User) {
            await saveUser(req,res)
          
            res.json({
                token:res.Token,
                status : true
            })
        }else {
          throw new BadRequestError(FORM_MESSAGES.SIGNUP.ALREADY_IN)
        }
        
      } catch (error) {
        next(error)
      }

  });
  

  module.exports = router;
