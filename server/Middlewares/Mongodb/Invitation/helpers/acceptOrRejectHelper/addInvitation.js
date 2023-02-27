const SERVER_REFFERENCE = require("../../../../../Schemas/user/serverReference");
const BadRequestError = require("../../../../../common/errors/bad-request-error")
const SERVER = require("../../../../../Schemas/server/server")
// const addJoinedServerToUserRefference = require("./addJoinedServerToUserRefference")

function addInvitaion(FOUNDED_INVITATION, result,next){
    
    let alreadyIn = false
    for (const member of result.members ) {
        if(member.memberName === FOsUNDED_INVITATION.by){
            alreadyIn = true
        }
    }    
    
    if(alreadyIn){   
        throw new BadRequestError(`${FOUNDED_INVITATION.by} in already in Your server`)
    }
    SERVER
    .updateOne(
        {_id : FOUNDED_INVITATION.server.id},
        {
            $push: {
                members : {
                    memberName:FOUNDED_INVITATION.by,
                    adminStatus: false
                }
            } 
        })

    .then((result)=>{
        if(result){
                SERVER_REFFERENCE
                .updateOne(
                    {username : FOUNDED_INVITATION.by,},
                    {$push: {
                            joinedServers : FOUNDED_INVITATION.server.id 
                        } 
                    }).then((result)=>{
                        res.success = `Succesfully added ${FOUNDED_INVITATION.by}  to your server`
                        return 
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

module.exports = addInvitaion