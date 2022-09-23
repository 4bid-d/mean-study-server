const SERVER = require("../../../Schemas/server/server"); 
var mongoose = require('mongoose');
function createServer(req, res, next) {
    
    if(!res.userDetail ||
       !req.body.name 
       ) {
        res.createdServer = false
        next()        
    } 
    try {
        const newInstance = new SERVER({
            name: req.body.name,
            admin : {
                username: res.userDetail.username
            }
        })
        newInstance.save() ?  res.createdServer = true :  res.createdServer = false
        res.createdServer = true
        res.serverId = newInstance._id;
        // console.log("saved server")
        next()

    } catch (message) {
        console.log(message)
        res.createdServer = false
        next()
    }
    
}

module.exports = createServer 