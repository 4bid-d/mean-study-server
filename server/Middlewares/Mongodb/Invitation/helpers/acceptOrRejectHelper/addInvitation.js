const BadRequestError = require("../../../../../common/errors/bad-request-error")
const SERVER = require("../../../../../Schemas/server/server")
const addJoinedServerToUserRefference = require("./addJoinedServerToUserRefference")

function addInvitaion(FOUNDED_INVITATION, result,next){
    
    let alreadyIn = false
    for (const member of result.members ) {
        if(member.memberName === FOUNDED_INVITATION.by){
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
            addJoinedServerToUserRefference(FOUNDED_INVITATION.by,
                {
                    _id:FOUNDED_INVITATION.server.id ,
                    name:FOUNDED_INVITATION.server.name
                }
            )
            res.success = `Succesfully added ${FOUNDED_INVITATION.by}  to your server`
            return next
        }else{
            return next
        }
    })
    .catch((err)=>{
        return err
    })

                    
}

module.exports = addInvitaion