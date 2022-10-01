import {
  API_BODY,
  METHODS
} from "../config/api"
import { UseValidateToken } from "./UseValidateToken"
const throwErr = (message) =>{
    throw new Error(message)
}
async function getData (apiEndpoint) {
  const token = UseValidateToken()
 
  try {
    let request = await fetch(`${API_BODY}${apiEndpoint ? apiEndpoint : ""}`,{
      method: METHODS.GET,
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token ? token :null}` 
      },        
    })
    let data = await request.json()
    return data
  } catch (error) {
    throw error
  }
}
async function postData (method,apiEndpoint,body) {
  
  try {
    let request = await fetch(`${API_BODY}${apiEndpoint ? apiEndpoint : ""}`,
            {
              method:method.toUpperCase(), 
              mode: 'cors', // no-cors, *cors, same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
              'Content-Type': 'application/json'
      
              },
              redirect: 'follow', // manual, *follow, error
              referrerPolicy: 'no-referrer', 
              body: JSON.stringify(body ? body : throwErr("Body is required for POST method") )
            }
        )
      let data = {}
      data = await request.json()
      if(data) {
        data.status = true
        return data
      }
      else return {status:false}
  } catch (error) {
    throw error
  }
}

export const UseFetch = (method,apiEndpoint,body) =>{ 
  
  try {      
      if(!method ||
         (method.toUpperCase() !== METHODS.GET && method.toUpperCase() !== METHODS.POST)
        ) {
        throwErr("Invalid method or undefined method")
      }else{
        if(!body && method.toUpperCase() === METHODS.GET){
          return new Promise((resolve, reject)=>{
            getData(apiEndpoint).then((result)=> {
              if(!result) reject()
              resolve(result)
            })
          })      
        }
        return  new Promise((resolve, reject) => {
          postData(METHODS.POST,apiEndpoint,body).then((result)=>{
            if(!result.status) reject()
            resolve(result);
          })
        })
      }
      
    } catch (error) {
      throw new Error(`${error}.`)      
      }   
      
}
