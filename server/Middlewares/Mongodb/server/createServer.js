const SERVER = require("../../../Schemas/server/server"); 
const { v4: uuidv4 } = require('uuid');


async function createServer(req, res, next) {

    const ID = uuidv4();

    try {
        
        if(!req.body.name) throw new Error("Cant Create server Please mention name of the server.")  

        const newInstance = new SERVER({
            name: req.body.name,
            serverId : ID,
            admin : res.userDetail.username,
            members:[
                res.userDetail.username
            ]
        })  
        // 
        if(await newInstance.save()){
            res.createdServer = newInstance
            res.serverId = newInstance 
            next()
        }else{
            throw new Error("Cant create server , Please try again later.")
        }

    } catch (error) {
        next(error)
    }
    
}

module.exports = createServer 