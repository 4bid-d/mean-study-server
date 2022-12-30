function CheckUserIsMemberOf(req,res,next){
    try {
        let {members ,_id} = res.Server
        let {username} = res.userDetail
        let is_memberOf = false
        
        for (member of members) {
            if(member === username) {
              is_memberOf = true
              res.is_memberOf = true
              next()
              return 
            }
        }
        if(!is_memberOf){
            res.is_memberOf = false 
            next()
        }

    } catch (error) {
      next(error)
    }
}

module.exports  = CheckUserIsMemberOf