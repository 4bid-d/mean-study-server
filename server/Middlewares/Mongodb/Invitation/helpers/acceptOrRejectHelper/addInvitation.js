const SERVER = require("../../../../../Schemas/server/server")
const addJoinedServerToUserRefference = require("./addJoinedServerToUserRefference")

function addInvitaion(FOUNDED_INVITATION, result,next){
    
    let alreadyIn = false
    for (const member of result.members ) {
        if(member === FOUNDED_INVITATION.by){
            alreadyIn = true
        }
    }    
    
    console.log(FOUNDED_INVITATION , result , alreadyIn)
    if(alreadyIn){   
        throw new Error(`${FOUNDED_INVITATION.by} in already in Your server`)
    }
    SERVER
    .updateOne(
        {_id : FOUNDED_INVITATION.server.id},
        {
            $push: {
                members : FOUNDED_INVITATION.by
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