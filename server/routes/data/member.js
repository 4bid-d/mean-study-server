function CheckUserIsMemberOf(req,res,next){
    try {
        let {members ,_id} = res.Server
        let {username} = res.userDetail
        res.is_memberOf = false
        for (index in members) {
            if(members[index].memberName === username) {
              members[index].you = true
              res.is_memberOf = true
              console.log(members[index].you)
              next()
              return 
            }
        }
      
        next()
    } catch (error) {
      next(error)
    }
}

module.exports  = CheckUserIsMemberOf