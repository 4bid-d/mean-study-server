const { findOne } = require("../../../Schemas/Invitaion/invitaionSchema");
const INVITAION_MODEL = require("../../../Schemas/Invitaion/invitaionSchema"); 
const SERVER = require("../../../Schemas/server/server");
const SERVER_REFFERENCE = require("../../../Schemas/user/serverReference");

function deleteInvitation(index,array,username){
    let newArray =[]
        for(let i=0;i<array.length ; i++){
            if(i == index){
                continue
            }else{
                newArray.push(array[i])
            }
        }

    INVITAION_MODEL
    .updateOne(
        {
            username : username
        },
        {
            requests:[
                ...newArray
            ]
        })
    .then((result)=>{
        return
    })
}

function addJoinedServerToUserRefference(username,{serverId,name}){

    SERVER_REFFERENCE
    .findOne({
        username
    })
    .then((result)=>{

        SERVER_REFFERENCE
        .updateOne({
            username,
        },
        {
            joinedServers:[
                ...result.joinedServers,
                {
                    id: serverId,
                    name
                }
            ]
        })
        .then((result)=>{
            return
        })
    })
}

function acceptOrRejectIvitation(req, res, next){

    try {
        
        const USER = res.userDetail
        
        const {inviteID , decision} = JSON.parse(decodeURIComponent(req.params.encodedData))

        const FOUNDED_INVITATION = res.requests.filter((object)=>{        
            
            return object.id === inviteID.toString()
        
        })
        
        if(FOUNDED_INVITATION[0]){
        
            const index = res.requests.indexOf(FOUNDED_INVITATION[0])
        
             deleteInvitation(index,res.requests,USER.username)
        
            if(decision){

                SERVER
                .findOne(
                    {
                        serverId : FOUNDED_INVITATION[0].server.id
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
                            {
                                serverId : FOUNDED_INVITATION[0].server.id
                            },
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
                            res.success = "Succesfully addedd to your server"
                            next()
                        })
                    }else{
                        console.log("you are already in")
                    }
                })

            }else{
                console.log("rejected")
            }

        }else{
            console.log("cannot found inviataion")
        }

    } catch (error) {
            
    }

}
module.exports = acceptOrRejectIvitation