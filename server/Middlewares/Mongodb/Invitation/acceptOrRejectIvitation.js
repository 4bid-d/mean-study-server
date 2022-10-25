const SERVER = require("../../../Schemas/server/server");
const addJoinedServerToUserRefference = require("./helpers/acceptOrRejectHelper/addJoinedServerToUserRefference");
const deleteInvitation = require("./helpers/acceptOrRejectHelper/deleteInvitation");

function acceptOrRejectIvitation(req, res, next){

    try {
        const USER = res.userDetail      
        const {inviteID , decision} = JSON.parse(decodeURIComponent(req.params.encodedData))
        const FOUNDED_INVITATION = res.requests.filter((object)=>{        
            return object.id === inviteID.toString()
        })
        
        if(FOUNDED_INVITATION[0]){
            const index = res.requests.indexOf(FOUNDED_INVITATION[0])
            // Delete the request
            deleteInvitation(index,res.requests,USER.username)
            if(decision){
                SERVER
                .findOne(
                    {
                        serverId : FOUNDED_INVITATION[0].id
                    }
                )
                .then((result)=>{
                    let alreadyIn = false
                    for (const memberIndex in result.members ) {
                        if(result.members[memberIndex] === FOUNDED_INVITATION[0].by){
                            alreadyIn = true
                        }
                    }
        
                    if(!alreadyIn){   
                        SERVER
                        .updateOne(
                            {serverId : FOUNDED_INVITATION[0].server.id},
                            {
                                members:[
                                    ...result.members,
                                    FOUNDED_INVITATION[0].by
                                ]
                            })
                        .then((result)=>{
                            addJoinedServerToUserRefference(FOUNDED_INVITATION[0].by,
                                {
                                    serverId:FOUNDED_INVITATION[0].server.id ,
                                    name:FOUNDED_INVITATION[0].server.name
                                }
                            )
                            res.success = `Succesfully added ${FOUNDED_INVITATION[0].by}  to your server`
                            next()
                        })
                    }else{
                        throw new Error(`${FOUNDED_INVITATION[0].by} in already in Your server`)
                    }
                })
            }else{
                console.log("rejected")
            }
        }else{
            throw new Error("cannot found inviataion")
        }
    } catch (error) {
       next(error)   
    }

}
module.exports = acceptOrRejectIvitation