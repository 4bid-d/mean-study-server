function verifyAdminAccess(req, res, next){

    const user = res.userDetail
    const server = res.Server
    const member = res.is_memberOf
    res.adminCred = {}
    if(!(user || server || member)){
        res.adminCred = false
        server.adminKey  = null
        next() 
    }
    if(server.admin === user.username){
        res.adminCred = server.adminKey
        server.adminKey  = null
        next()
    }else{
        server.adminKey  = null
        res.adminCred = null
        next()
    }

}
module.exports = verifyAdminAccess