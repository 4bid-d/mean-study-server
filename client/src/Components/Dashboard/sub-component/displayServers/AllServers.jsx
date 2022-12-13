import "./allServers.css"
import React, { useEffect, useState ,useContext } from 'react'
import { UseFetch } from '../../../../Hooks/useFetch'
import { userDataContext } from '../../../../Hooks/userContext'
import {SERVER_CREATION_MESSAGES} from "../../../../config/serverCreation"
import { getLocalstorage } from '../../../../Hooks/useLocalstorage'
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
        <div className="drop-down" >
          <h3>Created Servers</h3>
              <div className="created-servers dropdown-content">
              {
                allCreatedServers ?  allCreatedServers.map((obj,key)=>(
                  <>
                    <div>
                      <a key={key}  href={`/server/${obj._id}`} >{obj.name }</a>
                    </div>
                  </>
                )
                ) : "No Server created."
              }
          </div>
        </div>

        <div className="drop-down" >
          <h3>
            Joined servers
          </h3>
          <div className="joined-servers dropdown-content">
            {
              allJoinedServers ?  
              allJoinedServers.map((obj,key)=> (
                <>
                  <div>
                    <a  key={key} href={`/server/${obj._id}`} >{obj.name }</a>
                  </div>
                </>
              ) ) : "No Server You joined."
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default AllServers