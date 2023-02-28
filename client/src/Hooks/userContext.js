import React, { createContext , useState , useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { UseValidateToken } from "./UseValidateToken"
// import {userDataContext} from "./../Store/userDataContext"
import { FetchRequest} from "../Hooks/useFetch"
export const userDataContext = createContext()   

export function UserProvider( { children } ) {
  const token = UseValidateToken()
  const [ Data , setData ] = useState( {} ) 
  const navigate = useNavigate()
  const newRequest = new FetchRequest()
  useEffect(() => { 
   
    if( !token ){
      navigate( "/login" )
      return 
    }
    newRequest.getData(`user`)
    .then(( result )=>{
      
        if(result.JsonWebTokenError) navigate( "/login" )
        if(result){
          result.token = token
          setData( result )
        }
    })
  }, [token])

  return (
    
    <userDataContext.Provider value={ Data ? Data : null }>
        { children }
    </userDataContext.Provider>
    
  )
}
