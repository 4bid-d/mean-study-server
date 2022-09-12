const API_BODY = "http://localhost:3001/"
const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
}
const throwErr = (message) =>{
    throw new Error(message)
}
async function getData (apiEndpoint) {
 
  try {
    let request = await fetch(`${API_BODY}${apiEndpoint ? apiEndpoint : ""}`,{
      method: METHODS.GET,        
    })
    let data = await request.json()
    return data
  } catch (error) {
    throw error
  }
}
async function postData (method,apiEndpoint,body) {
  
  try {
    let request = fetch(`${API_BODY}${apiEndpoint ? apiEndpoint : ""}`,
            {
              method:method.toUpperCase(), 
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(body ? body : throwErr("Body is required for POST method") )
            }
        )
        let data = await request.json()
        return data
  } catch (error) {
    throw error
  }
}

function useFetch(method,apiEndpoint,body) { 
  
  try {      
      if(!method ||
         (method.toUpperCase() !== METHODS.GET && method.toUpperCase() !== METHODS.POST)
        ) {
        throwErr("Invalid method or undefined method")
      }else{
        if(!body && method.toUpperCase() === METHODS.GET){
          return new Promise((resolve, reject)=>{
            getData(apiEndpoint).then((res)=> {
              if(!res) reject()
              resolve(res)
            })
          })      
        }
        return  new Promise((resolve, reject) => {
          postData(METHODS.POST,apiEndpoint,body).then((res)=>{
            if(!res) reject()
            resolve(res);
          })
        })
      }
      
    } catch (error) {
      throw new Error(`${error}.`)      
      }   
      
}

export default useFetch