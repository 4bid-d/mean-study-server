var express = require('express');
var router = express.Router();
const allUsers = require("../Middlewares/Mongodb/user/allUsers")
const verifyJsonToken =  require("../Middlewares/Jwt/verify")
const createJsonToken =  require("../Middlewares/Jwt/createToken")
const findUser  = require("../Middlewares/Mongodb/user/findUser"); 
const FORM_MESSAGES  = require("../config/formValidationMessages")
const bcrypt = require('bcrypt')

router.post('/',createJsonToken,findUser,async function(req, res) {
  try {
    const DETAILS = req.body
    if(res.User) {
        const comparePassword = await bcrypt.compare(DETAILS.password,res.User.password)
        if(DETAILS.username !==  res.User.username ) throw  FORM_MESSAGES.LOGIN.INVALID_USERNAME 
        if(!comparePassword) throw FORM_MESSAGES.LOGIN.INVALID_PASSWORD
        else {
            res.json({message:FORM_MESSAGES.LOGIN.SUCCESSFULLY_LOGINED,token : res.Token})
        }
    }
    else {
        throw FORM_MESSAGES.LOGIN.NO_USER_FOUND
    }

  } catch (error) {
    res.json({message : error})
  }
});

module.exports = router;
