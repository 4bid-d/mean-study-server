const SERVER_REFERENCE = require("../../../Schemas/user/serverReference"); 
let log = console.log

const findOrUpdateReference = (query , updation, onSuccess ,onFail )=>{
    SERVER_REFERENCE.findOneAndUpdate(query, updation,  (error, result)=> {
        if (!error) {
            onSuccess()
            if (!result) {
                onFail()
            }
        }
    });
}
 

function addServerToUser(req, res, next) {

    try {

        if(!res.serverId || !res.createdServer)
        {
            let err = new Error("cant create server").status = 301 
            throw err
        } 
       
        const NEW_SERVER = res.serverId  ?? false
        let serversArray,update 
        const { username ,email } =  res.userDetail
        let allServersArray  = res.existingReference.servers ?? false
        

        // Setup stuff
        const query = {
            username: username,
            email: email,
        }  

        if(allServersArray){
            serversArray =  Array.from(allServersArray)
            NEW_SERVER ? serversArray.push(NEW_SERVER) : null
            update = {
                servers:[
                    ...serversArray,
                ]
            }
        }
  
        findOrUpdateReference(query,update,()=>{
            res.registration = true
            next()
        },
        ()=>{

            let  NewRefference = new SERVER_REFERENCE({
                    username: username ,
                    email: email,
                    servers: [
                        NEW_SERVER
                    ]
            })
            NewRefference.save(function(error) {
                    if (!error) {
                        res.registration = true
                        next()
                    } else {
                        res.registration = false
                        throw new Error("Cant Complete registration.")
                    }
                });
        })
        
    } catch (error) {
        next(error)
    }
    
}

module.exports = addServerToUser

        