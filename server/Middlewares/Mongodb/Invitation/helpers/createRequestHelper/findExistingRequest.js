/* to find request do already exists
   and return boolean.
*/
function findExistingRequest(requests,NEW_REQUEST){
    const existingRequest = requests.find((object)=>{
        return object.by == NEW_REQUEST.username && object.server.name ==  NEW_REQUEST.serverName
    })   
    return existingRequest ?? false  
}

module.exports = findExistingRequest