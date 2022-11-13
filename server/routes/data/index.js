var express = require('express');
var router = express.Router();
const allUsers = require("../../Middlewares/Mongodb/user/allUsers")
const API_MESSAGES  = require("../../config/dataApiErrorMessage")
const FORM_MESSAGES  = require("../../config/formValidationMessages")
// var shell = require('shelljs');
/* GET users listing. */

router.post('/usernameCheck',allUsers,function(req, res,next) {
    const username =  req.body.data
    let users  = res.users 

    try {
      
      if(users) {
          for (const user of users) {
            if(user.username === username) {
              res.json({founded : true })
              return
            }
          }

          throw new Error("username not found.")
      }

    } catch (error) {
       next(error)
    }
    
});

module.exports = router;

// for(let i =  0 ; i < res.users.length ; i++){
//       if(res.users[i].username == username){
//         res.json({status : true})
//         return
//       } 
//       else{
//        continue
//       }
//     }