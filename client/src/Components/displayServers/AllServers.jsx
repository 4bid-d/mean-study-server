import React, { useEffect, useState ,useContext } from 'react'
import { UseFetch } from '../../Hooks/useFetch'
import { userDataContext } from '../../Hooks/userContext'
import {SERVER_CREATION_MESSAGES} from "../../config/serverCreation"
import { getLocalstorage } from '../../Hooks/useLocalstorage'

function AllServers() {
    
    const token  = getLocalstorage("Token")
    const [allServers , setServers] = useState({})
    useEffect(() => {
        // if (!user.token ) alert(SERVER_CREATION_MESSAGES.PLEASE_RELOAD) 
        UseFetch("get",`server/${token}/serverReference`)
        .then((response)=> {
          if(response.JsonWebTokenError) {
              return
          }
          if(response.error) {
            
            alert(response.error)
            return 
          }
          if(response){
            
            setServers(response.data)
            console.log(allServers)        
          }
          
        })
    }, [token])
    
  return (
    <>
    <div>All Server</div>
    </>
  )
}

export default AllServers