var express = require('express');
var router = express.Router();
const bearerVerification = require('../../Middlewares/auth/bearerVerification.js');
const createNewsFeed = require('../../Middlewares/Mongodb/newsfeeds/create.js');
const findServer = require('../../Middlewares/Mongodb/server/findServerInstance.js');
const CheckUserIsMemberOf = require('../data/member.js');

router.post('/:serverId',
bearerVerification,
findServer,
CheckUserIsMemberOf,
createNewsFeed,
function(req, res,next) {

    const {savedDoc} = res
    try {
        if(savedDoc){
            res.json({message:"successfully uploaded"})
        }
    } catch (error) {
       next(error)
    }
    
});

module.exports = router;