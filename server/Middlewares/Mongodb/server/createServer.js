const SERVER = require("../../../Schemas/server/server"); 
const { v4: uuidv4 } = require('uuid');
const BadRequestError = require("../../../common/errors/bad-request-error");


async function createServer(req, res, next) {

    const ID = uuidv4();

    try {
        
        if(!req.body.name) throw new BadRequestError("Cant Create server Please mention name of the server.")  

        const newInstance = new SERVER({
            name: req.body.name,
            serverId : ID,
            admin : res.userDetail.username,
            members:[{
              memberName:res.userDetail.username,
              adminStatus:true
            }]
        })  
        // 
        if(await newInstance.save()){
            res.createdServer = newInstance
            res.serverId = newInstance 
            next()
        }else{
            throw new BadRequestError("Cant create server , Please try again later.")
        }

    } catch (error) {
        next(error)
    }
    
}

module.exports = createServer 