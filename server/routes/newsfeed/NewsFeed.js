var express = require('express');
var router = express.Router();
const bearerVerification = require('../../Middlewares/auth/bearerVerification.js');
const createNewsFeed = require('../../Middlewares/Mongodb/newsfeeds/create.js');
const findServer = require('../../Middlewares/Mongodb/server/findServerInstance.js');
const CheckUserIsMemberOf = require('../data/member.js');
const FEEDS = require("../../Schemas/server/feeds");
const NotFoundError = require('../../common/errors/not-found-error.js');
const BadRequestError = require('../../common/errors/bad-request-error.js');
const comments = require('../../Schemas/server/comments.js');
const feeds = require('../../Schemas/server/feeds');

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

router.get("/:serverId/:feedId",
bearerVerification,
findServer,
CheckUserIsMemberOf,
(req,res,next)=>{
    try {
        const {Server , is_memberOf } = res
        const {feedId} = req.params
        if(!Server) throw new  BadRequestError("no server found")
        if(!is_memberOf) throw new BadRequestError("You can not have access")
        FEEDS.findOne({
            _id : feedId
        })
        .populate("comments")
        .then((doc)=>{
            if(doc === null) next(new NotFoundError()) 
            else {
                res.json(doc)
            } 
        })
        .catch((err)=>{
            next(new NotFoundError())
        })
    } catch (error) {
       next(error)
    }
})

router.delete("/:serverId/:feedId",
bearerVerification,
findServer,
CheckUserIsMemberOf,
(req,res,next)=>{
    try {
        const {Server , is_memberOf ,userDetail} = res
        const {feedId} = req.params
        if(!Server) throw new  BadRequestError("no server found")
        if(!is_memberOf) throw new BadRequestError("You can not delete this feed")
        FEEDS.findOne({
            _id : feedId
        })
        .then((doc)=>{
            if(doc === null) next(new NotFoundError()) 
            if(userDetail.username === doc.createdBy){
                FEEDS.findByIdAndDelete({
                    _id : feedId
                })
                .then((doc)=>{
                    if(doc === null) next(new NotFoundError()) 
                    else  res.json({message:"successfully Deleted"})
                })
                .catch((err)=>{
                    next(new NotFoundError())
                })
            }
            else res.json({message:"cannot Delete this feed"})
        })
        .catch((err)=>{
            next(new NotFoundError())
        })
    } catch (error) {
       next(error)
    }
})

router.put("/:serverId/:feedId",
bearerVerification,
findServer,
CheckUserIsMemberOf,
(req,res,next)=>{
    try {
        console.log("Called 1st")
        const {Server , is_memberOf, userDetail } = res
        const {feedId} = req.params
        const {content} = req.body
        if(!content) throw new BadRequestError("Please Provide all required credentials")
        if(!Server) throw new  BadRequestError("no server found")
        if(!is_memberOf) throw new BadRequestError("You can not update this feed")

        FEEDS.findOne({
            _id : feedId
        })
        .then((doc)=>{
            if(doc === null) next(new NotFoundError()) 
            else{
                if(userDetail.username === doc.createdBy){
                    FEEDS.findByIdAndUpdate({
                        _id : feedId
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

router.post("/:serverId/:feedId/comment",
bearerVerification,
findServer,
CheckUserIsMemberOf,
(req,res)=>{
    const {Server, userDetail , is_memberOf } = res
    const {feedId} = req.params
    const {content} = req.body
    if(!Server) throw new  BadRequestError("no server found")
    if(!is_memberOf) throw new BadRequestError("You are not suppose to be do this.")
    if(!content) throw new BadRequestError("Please Provide all required credentials")
    const comment = new comments({
        createdBy: userDetail.username,
        content:content
    })
    comment.save().then((doc)=>{
        FEEDS.findOneAndUpdate({
            _id : feedId
         },{ 
             $push:{
                 comments : doc._id
             }
        })
        .then(()=>{
            res.json({message : "Successfully commented"})
        })
        .catch(()=>{
            res.json({message : "Unsuccessfull"})
        })
    })
})

router.put("/:serverId/comment/:commentId",
bearerVerification,
findServer,
CheckUserIsMemberOf,
(req,res,next)=>{
    try {
        console.log("Called")
        const {Server , is_memberOf, userDetail } = res
        const {commentId} = req.params
        const {content} = req.body
        if(!content) throw new BadRequestError("Please Provide all required credentials")
        if(!Server) throw new  BadRequestError("no server found")
        if(!is_memberOf) throw new BadRequestError("You can not update this comment")

        comments.findOne({
            _id : commentId
        })
        .then((doc)=>{
            if(doc === null) next(new NotFoundError()) 
            else{
                if(userDetail.username === doc.createdBy){
                    comments.findByIdAndUpdate({
                        _id : commentId
                    },
                    {
                        content : content
                    })
                    .then((doc)=>{
                        if(doc === null) next(new NotFoundError()) 
                        else  res.json({message:"successfully updated the commment"})
                    })
                    .catch((err)=>{
                        next(new NotFoundError())
                    })
                }
                else next(new BadRequestError("You cannot update this comment"))
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