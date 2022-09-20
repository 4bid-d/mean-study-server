const ACCESSTYPES = {
    GET_ITEMS:"get",
    SET_ITEMS: "set"
}
const ERROR_MESSAGES = {
    METHOD_ERROR:`Invalid method "get","set".`,
    KEY_ERROR: 'Enter a key for identify data.',
    DATA_ERROR:"Data must be defined and should be "+ 
    "an object and contains key value pair .",
    USUAL_ERROR:"Invalid method."
}
function accessLocalstorage(accesstype , dataOrKey) {
  switch (accesstype) {
    case ACCESSTYPES.GET_ITEMS:
        localStorage.getItem(dataOrKey)
        break;
    case ACCESSTYPES.SET_ITEMS:
        for(let i = 0 ; i< Object.keys(dataOrKey).length ; i++){
            console.log(dataOrKey[i])
        }
        break;
  
  }
}

function UseLocalstorage(
    method,
    {
    ...data
    },
    key
) {

    if(!method) throw new Error(ERROR_MESSAGES.METHOD_ERROR)
    if(!data) throw new Error(ERROR_MESSAGES.DATA_ERROR)
    if(method === ACCESSTYPES.GET_ITEMS) accessLocalstorage(method,data)
    if(method === ACCESSTYPES.SET_ITEMS) accessLocalstorage(method,key)
    else throw new Error(ERROR_MESSAGES.USUAL_ERROR)
}

export default UseLocalstorage