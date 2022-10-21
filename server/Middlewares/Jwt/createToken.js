const jwt = require('jsonwebtoken');
require('dotenv').config()
const bcrypt = require('bcrypt')

const createJsonToken = async(req,res,next)=>{

    try {
        
        // if(!res.User) {
        //     next()
        //     return
        // }

        const DETAILS = req.body
      
            console.log("json crewated")
            const newObj =  Object.assign({}, DETAILS);
            const bycryptedPassword = await bcrypt.hash(DETAILS.password,10)
            newObj.password = bycryptedPassword
            const brandNewToken =  jwt.sign(newObj, process.env.SECRET_KEY)
            res.Token = brandNewToken
            next()
        
    } catch (error) {
        next(error)
    }
}

module.exports = createJsonToken