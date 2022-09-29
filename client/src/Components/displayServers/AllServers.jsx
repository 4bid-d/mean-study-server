import React, { useEffect, useState ,useContext } from 'react'
import { UseFetch } from '../../Hooks/useFetch'
import { userDataContext } from '../../Hooks/userContext'
import {SERVER_CREATION_MESSAGES} from "../../config/serverCreation"
import { getLocalstorage } from '../../Hooks/useLocalstorage'
import { useNavigate } from 'react-router-dom'

function AllServers() {
    
    const token  = getLocalstorage("Token")
    const [allServers , setServers] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
      if (!token ) navigate("/login")
      UseFetch("get",`server/${token}/serverReference`)
      .then((response)=> {
        console.log( response ) 
        if(response.JsonWebTokenError) {
              return
          }
          if(response.error) {
            
            alert(response.error)
            return 
          }
          if(response){
            
            setServers(response.data.servers)
            console.log(allServers)        
          }
          
        })
    }, [token])
    
    console.log( allServers ? allServers: null)

  return (
    <>
    <div>All Server</div>
    {
      allServers.map((obj)=> <h3><a href={`/server/${obj.id}`} >{obj.name}</a></h3> )
    }
    </>
  )
}

export default AllServers