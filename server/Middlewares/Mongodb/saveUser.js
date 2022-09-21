const USER = require("../../Schemas/user")
const bcrypt = require('bcrypt')

const saveUser = async (req, res) =>{
        try {
            console.log(req.body)
            const bycryptedPassword = await bcrypt.hash(req.body.password,10)
            const newUser = new USER(
                {
                    username: req.body.username,
                    email: req.body.email, 
                    password: bycryptedPassword,
                }
            )
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