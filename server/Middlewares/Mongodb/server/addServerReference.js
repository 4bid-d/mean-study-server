const SERVER_REFERENCE = require("../../../Schemas/user/serverReference"); 

function addServerToUser(req, res, next) {
    if(!res.createdServer||
       !res.serverId ||
       !res.userDetail
    ){
        res.registration = false 
        next()
    } 
    try {
       
        let serversArray = []
        // Setup stuff
        const query = {
            username: res.userDetail.username,
            email: res.userDetail.email,
        }  
        let update = {}
        if(res.existingReference){
            res.existingReference.servers.forEach((serverObject)=>{
                serversArray.push(serverObject)
            })

            update = {
                servers:[
                    ...serversArray,
                    res.serverId
                ]
            }
            res.registration = true
            console.log("updated the document")
            next()
        }
  

        SERVER_REFERENCE.findOneAndUpdate(query, update,  (error, result)=> {
            if (!error) {
                res.registration = true
                next()
                if (!result) {
                   let  NewRefference = new SERVER_REFERENCE({
                    username: res.userDetail.username ,
                    email: res.userDetail.email,
                        servers: [
                            res.serverId
                        ]
                    })
                    NewRefference.save(function(error) {
                        if (!error) {
                            res.registration = true
                            console.log("Save the document")
                            next()
                        } else {
                            res.registration = false
                            // throw "Cant Complete registration."
                            next()
                        }
                    });
                }
            }
        });
        
        
        
    } catch (message) {
        console.log(message)
    }
    
}

module.exports = addServerToUser

        