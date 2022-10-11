/**
 * Takes and returns the matching
 * admin from the given user array.
 */
 function findAdminDetails(Users, username){
    return Users.find((object)=>{
        return object.username === username
    })
}

module.exports = findAdminDetails