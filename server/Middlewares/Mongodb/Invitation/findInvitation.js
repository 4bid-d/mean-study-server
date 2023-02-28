const BadRequestError = require("../../../common/errors/bad-request-error");
const NotFoundError = require("../../../common/errors/not-found-error");
const REQUEST_MODEL = require("../../../Schemas/Requests/RequestsSchema"); 
log = console.log
function findRequests(req, res, next){

    const {username} = res.userDetail
    REQUEST_MODEL
    .findOne({
        username: username
    })
    .then((result)=>{ 
        if(!result) throw new BadRequestError("Cannot find any invitaion.")
        res.requests = result.requests   
        next()
    })
    .catch((error)=>{
        next(new NotFoundError())
    })

}
module.exports = findRequests