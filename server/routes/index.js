var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message : "welcme"});
});

router.get('/home', function(req, res, next) {
  res.json({message : "Welcome to home"});
});

module.exports = router;
