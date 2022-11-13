const INVITAION_MODEL = require("../../../../../Schemas/Invitaion/invitaionSchema"); 
log =   console.log
function deleteInvitation(obj,array,username){

    INVITAION_MODEL
    .updateOne(
        {
            username : username
        },
        { 
            $pull: { requests : obj  } 
        })
    .then((result)=>{
        log(result)
    })
}
module.exports = deleteInvitation