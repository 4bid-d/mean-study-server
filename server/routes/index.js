var express = require('express');
var router = express.Router();
const allUsers = require("../Middlewares/Mongodb/user/allUsers")
const API_MESSAGES  = require("../config/dataApiErrorMessage")
const FORM_MESSAGES  = require("../config/formValidationMessages")
// var shell = require('shelljs');
/* GET users listing. */
router.post('/usernameCheck',allUsers,async function(req, res) {
    let username =  req.body.data
    if(res.users) {
        for(let i =  0 ; i < res.users.length ; i++){
              if(res.users[i].username == username){
                res.json({status : true})
                return
              } 
              else{
               continue
              }
            }
        res.json({status : false})
      } else {
        console.log(API_MESSAGES.USERNAME_API.UNABLE_TO_USERNAME)
      }
    // shell.exec('git')
});

module.exports = router;
