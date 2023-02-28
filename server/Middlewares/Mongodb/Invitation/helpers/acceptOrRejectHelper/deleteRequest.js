const REQUEST_MODEL = require("../../../../../Schemas/Requests/RequestsSchema"); 
log =   console.log
function deleteRequest(obj,array,username){

    REQUEST_MODEL
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
module.exports = deleteRequest