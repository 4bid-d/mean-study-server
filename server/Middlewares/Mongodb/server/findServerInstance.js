const SERVER = require("../../../Schemas/server/server"); 


function findServer(req, res, next){

        let id = req.params.serverId
        SERVER
        .findOne({
            serverId:id
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
    
}
module.exports = findServer 