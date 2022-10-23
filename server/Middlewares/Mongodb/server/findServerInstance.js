const { ObjectId } = require("mongodb");
const SERVER = require("../../../Schemas/server/server"); 


function findServer(req, res, next){

        try {
            const {serverId} = req.params
            if(!ObjectId.isValid(serverId)) throw new TypeError("invalid server id")   

            SERVER
            .findOne({
                _id:serverId
            })
            .then((result)=>{

                if(result === null) throw  new Error("Invalid server requested.")

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