const SERVER_REFFERENCE = require("../../../../../Schemas/user/serverReference");
const BadRequestError = require("../../../../../common/errors/bad-request-error")
const SERVER = require("../../../../../Schemas/server/server")

function addUserAsMember(Object, result,next){
    
    let alreadyIn = false
    for (const member of result.members ) {
        if(member.memberName === Object.user){
            alreadyIn = true
        }
    }    
    
    if(alreadyIn){   
        next(new BadRequestError(`${Object.user} in already in Your server`))
    }
    SERVER
    .updateOne(
        {_id : Object.serverId},
        {
            $push: {
                members : {
                    memberName:Object.user,
                    adminStatus: false
                }
            } 
        })

    .then((result)=>{
        if(result){
                SERVER_REFFERENCE
                .updateOne(
                    {username : Object.user,},
                    {$push: {
                            joinedServers : Object.serverId 
                        } 
                    }).then((result)=>{
                        res.success = `Succesfully added ${Object.user}  to your server`
                        next()
                    // console.log(result)
                    }).catch((err)=>{
                    return err
                })
        }else{
            return 
        }
    })
    .catch((err)=>{
        return err
    })

                    
}

module.exports = addUserAsMember