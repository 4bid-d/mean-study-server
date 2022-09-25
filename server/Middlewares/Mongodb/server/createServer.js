const SERVER = require("../../../Schemas/server/server"); 
const { v4: uuidv4 } = require('uuid');


function createServer(req, res, next) {
    const ID = uuidv4();
    if(!res.userDetail ||
       !req.body.name 
       ) {
        res.createdServer = false
        next()        
    } 
    try {
        const newInstance = new SERVER({
            name: req.body.name,
            serverId : ID,
            admin : {
                username: res.userDetail.username
            }
        })
        newInstance.save() ?  res.createdServer = true :  res.createdServer = false
        console.log("server  created")
        res.createdServer = true
        res.serverId = {
            id : ID,
            name: req.body.name 
        }
        // console.log("1" + res.serverId)
        next()

    } catch (message) {
        console.log(message)
        res.createdServer = false
        next()
    }
    
}

module.exports = createServer 