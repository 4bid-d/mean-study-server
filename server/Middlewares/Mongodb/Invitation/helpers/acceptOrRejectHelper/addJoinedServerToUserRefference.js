const SERVER_REFFERENCE = require("../../../../../Schemas/user/serverReference");

function addJoinedServerToUserRefference(username,serverObj){

        SERVER_REFFERENCE
        .updateOne({
                username,
            },
        {
            $push: {
                joinedServers : serverObj
            } 
        })
        .then((result)=>{
            console.log(result)
        })
        .catch((err)=>{
            return err
        })
    }


module.exports = addJoinedServerToUserRefference