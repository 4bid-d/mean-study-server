const SERVER_REFFERENCE = require("../../../../../Schemas/user/serverReference");

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

module.exports = addJoinedServerToUserRefference