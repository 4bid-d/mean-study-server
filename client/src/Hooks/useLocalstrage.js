const ACCESSTYPES = {
    GET_ITEMS:"GET_ITEMS",
    SET_ITEMS: "SET_ITEMS"
}
const ERROR_MESSAGES = {
    METHOD_ERROR:`Invalid method "get","set".`,
    KEY_ERROR: 'Enter a key for identify data.',
    DATA_ERROR:"Data must be defined and should be an object and contains key value pair."
}
function accessLocalstorage(accesstype , dataOrKey) {
  switch (accesstype) {
    case ACCESSTYPES.GET_ITEMS:
        
        break;
  
    default:
        break;
  }
}

function UseLocalstorage(
    {
        method,
        ...data
    }
) {

    if(method) throw new Error(ERROR_MESSAGES.METHOD_ERROR)
    if(typeof data != "object") throw new Error(ERROR_MESSAGES.DATA_ERROR)
    
}

export default UseLocalstorage