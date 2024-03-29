var express = require('express');
var router = express.Router();
const allUsers = require("../../Middlewares/Mongodb/user/allUsers")
const createJsonToken =  require("../../Middlewares/auth/createToken")
const findUser  = require("../../Middlewares/Mongodb/user/findUser"); 
const FORM_MESSAGES  = require("../../config/formValidationMessages")
const bcrypt = require('bcrypt');
const validateCredentials = require('./helpers/valdate');
const BadRequestError = require('../../common/errors/bad-request-error');

router.post('/',
validateCredentials,
findUser,
createJsonToken,
async function(req, res, next) {
  try {
    const {password , email ,username} = req.body
    const user = res.User  
    const TOKEN = res.Token
    
    if(user) {
        const comparePassword = await bcrypt.compare(password,user.password)
        if(username !==  user.username ) throw new BadRequestError(FORM_MESSAGES.LOGIN.INVALID_USERNAME) 
        if(!comparePassword) throw new BadRequestError(FORM_MESSAGES.LOGIN.INVALID_PASSWORD)
        else {
            res.json({message:FORM_MESSAGES.LOGIN.SUCCESSFULLY_LOGINED,token : TOKEN ?? null})
        }
    }
    else {
        throw new BadRequestError(FORM_MESSAGES.LOGIN.NO_USER_FOUND)
    }

  } catch (error) {
    next(error)
  }
});

module.exports = router;
