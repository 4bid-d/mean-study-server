var express = require('express');
const BadRequestError = require('../../common/errors/bad-request-error');
const bearerVerification = require('../../Middlewares/auth/bearerVerification');
const findServerReference = require('../../Middlewares/Mongodb/server/findServerReference');
var router = express.Router();

router.get('/',
bearerVerification,
findServerReference,
function( req, res, next) {
  try {

    if(!res.existingReference) throw new BadRequestError("You dont have any servers created.")
    else{
      // console.log(res.existingReference.servers)
      res.json( { data : res.existingReference } )
      return 
    }
  } catch (error) {
    next(error)
  }
});

module.exports = router