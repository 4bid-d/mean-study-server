var express = require('express');
var router = express.Router();
const allUsers = require("../../Middlewares/Mongodb/user/allUsers")

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
