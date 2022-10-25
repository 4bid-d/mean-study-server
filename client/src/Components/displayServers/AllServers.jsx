import React, { useEffect, useState ,useContext } from 'react'
import { UseFetch } from '../../Hooks/useFetch'
import { userDataContext } from '../../Hooks/userContext'
import {SERVER_CREATION_MESSAGES} from "../../config/serverCreation"
import { getLocalstorage } from '../../Hooks/useLocalstorage'
import { useNavigate } from 'react-router-dom'

function AllServers() {
    
    const token  = getLocalstorage("Token")
    const [allCreatedServers , setCreatedServers] = useState([])
    const [allJoinedServers , setJoinedServers] = useState([])
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
            console.log(response.data)
            setCreatedServers(response.data.servers)     
            setJoinedServers(response.data.joinedServers)     
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
            allCreatedServers ?  allCreatedServers.map((obj,key)=> <h3 key={key}><a  href={`/server/${obj._id}`} >{obj.name }</a></h3> ) : "No Server created."
          }
        <h3>
          Joined servers
        </h3>
          {
            allJoinedServers ?  allJoinedServers.map((obj,key)=> <h3 key={key}><a  href={`/server/${obj._id}`} >{obj.name }</a></h3> ) : "No Server You joined."
          }
      </div>
    </>
  )
}

export default AllServers