var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message : "welcme"});
});

router.get('/home', function(req, res, next) {
  res.json({message : "Welcome to home"});
});

router.post('/login', function(req, res, next) {
console.log("arrived")
});

router.post('/signup', function(req, res, next) {
  console.log(req.body)
  if(req.body.username) res.json({message:"youve successfully signedin ."})
});

module.exports = router;
