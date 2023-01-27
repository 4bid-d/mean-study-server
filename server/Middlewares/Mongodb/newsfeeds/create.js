const BadRequestError = require("../../../common/errors/bad-request-error")
const FEEDS = require("../../../Schemas/server/feeds")
const SERVER = require("../../../Schemas/server/server")

function createNewsFeed(req,res,next){

    try {
        const {content} = req.body
        const {Server , is_memberOf } = res
        if(!Server) throw new  BadRequestError("no server found")
        if(!is_memberOf) throw new BadRequestError("You are not suppose to be do this.")
        if(!content) throw new BadRequestError("Please Provide all required credentials")
        else{
            const newFeed = new FEEDS({
                content : content,
                image:(res.imageId ? res.imageId : ""),
                createdBy:res.userDetail.username 
            })
            newFeed.save()
            .then((savedDoc)=>{
                if(savedDoc){
                    res.savedDoc = true 
                    SERVER.updateOne(
                        { _id : Server._id },
                        {
                            $push :{ feeds : savedDoc }
                        }
                    ).then((doc)=>{
                        next()
                    })
                }
            }).catch((err)=>{
                next(err)
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = createNewsFeed