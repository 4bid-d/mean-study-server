import {
  API_BODY,
  METHODS
} from "../config/api"

const throwErr = (message) =>{
    throw new Error(message)
}

async function postData (method,apiEndpoint,body,token) {
  
  try {
    let request = await fetch(`${API_BODY}${apiEndpoint ? apiEndpoint : ""}`,
            {
              method:method.toUpperCase(), 
              mode: 'cors', // no-cors, *cors, same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
              'Content-Type': 'application/json',
              "authorization": `Bearer ${token ? token :null}` 
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
  const token = localStorage.getItem("Token")
  try {      
      if(!method ||
         (method.toUpperCase() !== METHODS.GET && method.toUpperCase() !== METHODS.POST)
        ) {
        throwErr("Invalid method or undefined method")
      }else{
        if(!body && method.toUpperCase() === METHODS.GET){
          return new Promise((resolve, reject)=>{
            // getData(apiEndpoint,token)
            // .then((result)=> {
            //   if(!result) reject()
            //   resolve(result)
            // })
          })      
        }
        return  new Promise((resolve, reject) => {
          postData(METHODS.POST,apiEndpoint,body,token)
          .then((result)=>{
            if(!result.status) reject()
            resolve(result);
          })
        })
      }
      
    } catch (error) {
      throw new Error(`${error}.`)      
      }   
      
}

export class FetchRequest{
  constructor(){
    // this.endPoint = endPoint ?? ""
    this.token = localStorage.getItem("Token") ?? ""
    this.methods = {
      get : "GET",
      post : "POST"
    }
  }
  fetchData(method,end,body){
    return new Promise((resolve,reject)=>{
      fetch(`${API_BODY}${end ? end : ""}`,{
        method:method,
        headers: {
          'Content-Type': 'application/json',
          "authorization": `Bearer ${this.token ? this.token :null}` 
        },
        body: JSON.stringify(body ? body : (method === this.methods.post) ?  throwErr("Body is required for POST method") : null )
      }).then((response)=>{
        resolve(response)
      }).catch((err)=>{
        reject(err)
      })
    })
  }
  getData(endPoint){ 
      return new Promise((resolve,reject)=>{
        this.fetchData(this.methods.get,endPoint)
        .then((response)=>{
            response.json().then((data)=>{
            resolve(data)
          })
        }).catch((err)=>{
          reject(err)
        })
      })
  }
  
  postData (endpoint,body) { 
    try {
        this.fetchData(this.methods.post,endpoint,body)
        .then((data)=>{
          if(data) {
            data.status = true
            return data
          }
          else return {status:false}
        })
    } catch (error) {
      throw error
    }
  }
}