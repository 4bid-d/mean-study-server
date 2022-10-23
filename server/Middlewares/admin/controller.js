function verifyAdminAccess(req, res, next){

    const user = res.userDetail
    console.log("verify admin access called")

}
module.exports = verifyAdminAccess