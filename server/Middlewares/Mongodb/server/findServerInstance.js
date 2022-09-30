const SERVER = require("../../../Schemas/server/server"); 

function findServer(req, res, next){

    const id = req.params.serverId
    SERVER.findOne({
        serverId:id
    })
    .then((result)=>{
        if(!result){
            res.Server = false
            next()
        }
        res.Server = result
        next()
    })
    
}
module.exports = findServer 