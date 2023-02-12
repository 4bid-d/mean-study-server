
const BadRequestError = require("../../../common/errors/bad-request-error");
const DatabaseConnectionError = require("../../../common/errors/database-connection-error");
const SERVER_REFERENCE = require("../../../Schemas/user/serverReference"); 

const findOrUpdateReference = (query , updation, onSuccess ,onFail )=>{
    SERVER_REFERENCE.findOneAndUpdate(query, updation,  (error, result)=> {
        if (!error) {
            onSuccess()
            if (!result) {
                onFail()
            }
        }else{
            throw new BadRequestError(error.message)
        }
    });
}
 

function addServerToUser(req, res, next) {

    try {

        if(!res.serverId || !res.createdServer){
            let err = new BadRequestError("cant create server").status = 301 
            throw err
        } 
       
        const NEW_SERVER = res.serverId  ?? false
        const { username ,email } =  res.userDetail

        // Setup stuff
        const query = {
            username: username,
            email: email,
        }  

        const update  = {$push : {servers : NEW_SERVER} }
        const  whenSuccess = ()=>{
                res.registration = true
                next()
        }

        const whenFail = ()=>{

            let  NewRefference = new SERVER_REFERENCE({
                username: username ,
                email: email,
                servers: [
                    NEW_SERVER
                ]
            })
            
            NewRefference.save(function(error) {
                if (!error) {
                        whenSuccess()
                    } else {
                        res.registration = false
                        throw new DatabaseConnectionError()
                    }
                });
            }
            
            findOrUpdateReference(query,update,whenSuccess,whenFail)
            
    } catch (error) {
        next(error)
    }
    
}

module.exports = addServerToUser