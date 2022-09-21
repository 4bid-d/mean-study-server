const jwt = require('jsonwebtoken');
require('dotenv').config()
const bcrypt = require('bcrypt')

const createJsonToken = async(req,res,next)=>{

    const DETAILS = req.body
    const newObj =  Object.assign({}, DETAILS);
    const bycryptedPassword = await bcrypt.hash(DETAILS.password,10)
    newObj.password = bycryptedPassword
    const brandNewToken =  jwt.sign(newObj, process.env.SECRET_KEY)
    res.Token = brandNewToken
    next()
}

module.exports = createJsonToken