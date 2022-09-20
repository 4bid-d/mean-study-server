var express = require('express');
var router = express.Router();
const allUsers = require("../Middlewares/Mongodb/allUsers")
const API_MESSAGES  = require("../config/dataApiErrorMessage")
/* GET users listing. */
router.get('/username',allUsers,async function(req, res, next) {
  try {
    if(res.username) {
      res.json({usernames : res.username})
    } else {
      throw API_MESSAGES.USERNAME_API.UNABLE_TO_USERNAME
    }
  } catch (error) {
    console.log(error) 
  }
});

module.exports = router;
