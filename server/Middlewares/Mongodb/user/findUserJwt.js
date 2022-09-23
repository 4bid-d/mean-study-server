// const USER = require("../../../Schemas/user/user"); 

// function findUserWithToken(req, res, next) {
//     if(!res.userDetail) next()
//     const userEmail = res.userDetail.email 
//     try {
//         USER.findOne(
//             {
//                 email:req.body.email
//             }
//         ).then((result)=>{
//             if(result){
//                 res.User = result
//                 next()
//             }else{
//                 res.User = false
//                 next()
//             }
//         })
//     } catch (message) {
//         console.log(message)
//     }
    
// }

// module.exports = findUserWithToken