import {ERROR_MESSAGES} from "../config/localStorageMessages"

export function setLocalstorage(key,data){
    // if(!data) throw new Error(ERROR_MESSAGES.DATA_ERROR)
    if(!key) throw new Error(ERROR_MESSAGES.KEY_ERROR)
    if(localStorage.setItem(key, data)) return true
    else return false
}
export function getLocalstorage(key){
    if(!key) throw new Error(ERROR_MESSAGES.KEY_ERROR)
    const getData = localStorage.getItem(key.toString())
    if(getData) return getData
    else return false
}
 
