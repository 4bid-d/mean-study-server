var express = require('express');
var router = express.Router();
const bearerVerification = require('../../Middlewares/auth/bearerVerification.js');
const createNewsFeed = require('../../Middlewares/Mongodb/newsfeeds/create.js');
const findServer = require('../../Middlewares/Mongodb/server/findServerInstance.js');
const CheckUserIsMemberOf = require('../data/member.js');
const FEEDS = require("../../Schemas/server/feeds");
const NotFoundError = require('../../common/errors/not-found-error.js');
const BadRequestError = require('../../common/errors/bad-request-error.js');

router.post('/:serverId',
bearerVerification,
findServer,
CheckUserIsMemberOf,
createNewsFeed,
function(req, res,next) {

    const {savedDoc} = res.savedDoc
    try {
        if(savedDoc){
            res.json({message:"successfully uploaded"})
        }
    } catch (error) {
       next(error)
    }
    
});

router.get("/:serverId/:requestId",
bearerVerification,
findServer,
CheckUserIsMemberOf,
(req,res,next)=>{
    try {
        const {Server , is_memberOf } = res
        const {requestId} = req.params
        if(!Server) throw new  BadRequestError("no server found")
        if(!is_memberOf) throw new BadRequestError("You can not have access")
        FEEDS.findOne({
            _id : requestId
        })
        .then((doc)=>{
            if(doc === null) next(new NotFoundError()) 
            else  res.json(doc)
        })
        .catch((err)=>{
            next(new NotFoundError())
        })
    } catch (error) {
       next(error)
    }
})

router.delete("/:serverId/:requestId",
bearerVerification,
findServer,
CheckUserIsMemberOf,
(req,res,next)=>{
    try {
        const {Server , is_memberOf } = res
        const {requestId} = req.params
        if(!Server) throw new  BadRequestError("no server found")
        if(!is_memberOf) throw new BadRequestError("You can not delete this feed")
        FEEDS.findOneAndDelete({
            _id : requestId
        })
        .then((doc)=>{
            if(doc === null) next(new NotFoundError()) 
            else  res.json({message:"successfully Deleted"})
        })
        .catch((err)=>{
            next(new NotFoundError())
        })
    } catch (error) {
       next(error)
    }
})

router.put("/:serverId/:requestId",
bearerVerification,
findServer,
CheckUserIsMemberOf,
(req,res,next)=>{
    try {
        const {Server , is_memberOf, userDetail } = res
        const {requestId} = req.params
        const {content} = req.body
        if(!content) throw new BadRequestError("Please Provide all required credentials")
        if(!Server) throw new  BadRequestError("no server found")
        if(!is_memberOf) throw new BadRequestError("You can not delete this feed")

        FEEDS.findOne({
            _id : requestId
        })
        .then((doc)=>{
            if(doc === null) next(new NotFoundError()) 
            else{
                if(userDetail.username === doc.createdBy){
                    FEEDS.findByIdAndUpdate({
                        _id : requestId
                    },
                    {
                        content : content
                    })
                    .then((doc)=>{
                        if(doc === null) next(new NotFoundError()) 
                        else  res.json({message:"successfully updated"})
                    })
                    .catch((err)=>{
                        next(new NotFoundError())
                    })
                }
                else next(new BadRequestError("You cannot update this feed"))
            }
        })
        .catch((err)=>{
            next(new NotFoundError())
        })
    } catch (error) {
       next(error)
    }
})
module.exports = router;