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
      UseFetch("get",`server/serverReference`)
      .then((response)=> {
        if(response.JsonWebTokenError) {
              return
          }
          if(response.error) {
            
            alert(response.error)
            return 
          }
          if(response){
            setServers(response.data.servers)     
          }
          
        })
    }, [token])
    

  return (
    <>
    <div>
    <h3>
      All Servers
    </h3>
    {
      allServers ?  allServers.map((obj,key)=> <h3 key={key}><a  href={`/server/${obj.id}`} >{obj.name }</a></h3> ) : "No Server created."
    }
    </div>
    </>
  )
}

export default AllServers