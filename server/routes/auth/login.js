var express = require('express');
var router = express.Router();
const allUsers = require("../../Middlewares/Mongodb/user/allUsers")
const createJsonToken =  require("../../Middlewares/Jwt/createToken")
const findUser  = require("../../Middlewares/Mongodb/user/findUser"); 
const FORM_MESSAGES  = require("../../config/formValidationMessages")
const bcrypt = require('bcrypt');
const validateCredentials = require('./helpers/valdate');

router.post('/',
validateCredentials,
findUser,
createJsonToken,
async function(req, res, next) {
  try {
    const DETAILS = req.body
    const user = res.User  
    const TOKEN = res.Token
    if(user) {
       console.log("varraved")
        const comparePassword = await bcrypt.compare(DETAILS.password,user.password)
        if(DETAILS.username !==  user.username ) throw new Error(FORM_MESSAGES.LOGIN.INVALID_USERNAME) 
        if(!comparePassword) throw new Error(FORM_MESSAGES.LOGIN.INVALID_PASSWORD)
        else {
            res.json({message:FORM_MESSAGES.LOGIN.SUCCESSFULLY_LOGINED,token : TOKEN ?? null})
        }
    }
    else {
        throw new Error(FORM_MESSAGES.LOGIN.NO_USER_FOUND)
    }

  } catch (error) {
    next(error)
  }
});

module.exports = router;
