const { ObjectId } = require("mongodb");
const BadRequestError = require("../../../common/errors/bad-request-error");
const SERVER = require("../../../Schemas/server/server"); 


function findServer(req, res, next){

        try {
            const {serverId} = req.params
            if(!ObjectId.isValid(serverId)) throw new BadRequestError("invalid server id")   

            SERVER.findOne(
            { _id:serverId},
            {  
                serverId :0,
                __v:0
            })
            .populate("feeds")
            .then((result)=>{
                if(result === null) throw  new BadRequestError("Invalid server requested.")

                res.Server = result
                next()
                return
            
            })
            .catch((error)=>{
                next(error)   
            })
        
        } catch (error) {
            next(error)
        }
}
module.exports = findServer 