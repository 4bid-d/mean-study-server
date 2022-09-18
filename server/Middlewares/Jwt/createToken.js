const jwt = require('jsonwebtoken');
require('dotenv').config()

const createJsonToken = (req,res,next)=>{

    const DETAILS = req.body 
    const brandNewToken =  jwt.sign(DETAILS, process.env.SECRET_KEY)
    res.Token = brandNewToken
    next()
}

module.exports = createJsonToken