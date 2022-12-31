import React, { createContext , useState , useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { UseValidateToken } from "./UseValidateToken"
// import {userDataContext} from "./../Store/userDataContext"
import { UseFetch } from "../Hooks/useFetch"
export const userDataContext = createContext()   

export function UserProvider( { children } ) {
  const token = UseValidateToken()
  const [ Data , setData ] = useState( {} ) 
  const navigate = useNavigate()
  useEffect(() => { 
   
    if( !token ){
      navigate( "/login" )
      return 
    }
    UseFetch( "get" , `user/` )
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
