const SERVER = require("../../../Schemas/server/server"); 

function findServer(req, res, next){
    console.log("findservr called")
    const id = req.params.serverId
    if(!id) {
        res.Server = false
        next() 
    }
    SERVER
    .findOne({
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