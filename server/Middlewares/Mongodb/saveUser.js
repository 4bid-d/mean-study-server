const USER = require("../../Schemas/user")

const saveUser = (req, res) =>{
        try {
            const newUser = new USER(
                {
                    username: req.body.username,
                    email: req.body.email, 
                    password: req.body.password,
                }
            )
            console.log(res.existingUser)
            if(!res.existingUser) {
                newUser.save()
                return true
            }  
            else{
                return false
            }
        } catch (message) {
           console.log(message) 
        }
}



module.exports = saveUser