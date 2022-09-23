const SERVER_REFERENCE = require("../../../Schemas/user/serverReference"); 

function addServerToUser(req, res, next) {
    if(!res.createdServer||
       !res.serverId ||
       !res.userDetail
        ) {
        res.registration = false 
        next()
    } 
    try {
       
        let serversArray = []
        if(!res.existingReference) {
            SERVER_REFERENCE.create({
                username: res.userDetail.username ,
                email: res.userDetail.email,
                servers: [
                    res.serverId
                ]
           })
           .then(()=>{
               res.registration = true
               next()
           })  
        }

        console.log("CAlled")
        res.existingReference.servers.forEach((serverIdObject)=>{
            serversArray.push(serverIdObject)
        })
        serversArray.push(res.serverId)
        SERVER_REFERENCE.updateMany({
            email: res.userDetail.email,
        },
        {
            servers: [
                ...serversArray
            ]
        })
        res.registration = true
        next()

    } catch (message) {
        console.log(message)
    }
    
}

module.exports = addServerToUser
