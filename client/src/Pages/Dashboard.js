import React, { useEffect, useState ,useContext,useRef } from 'react'
import { UseFetch } from '../Hooks/useFetch'
import { userDataContext } from '../Hooks/userContext'
import {SERVER_CREATION_MESSAGES} from "../config/serverCreation"
import { getLocalstorage } from '../Hooks/useLocalstorage'
import { useNavigate } from 'react-router-dom'

import CreateServerForm from '../Components/Server/create-form/form/CreateServerForm'
import AllServers from '../Components/general/sub-component/dropdown/Dropdown'
import Profile from '../Components/general/sub-component/Profile/Profile'
import ShowRequest from '../Components/request/ShowRequest/ShowRequest'
import SideMenu from '../Components/general/sidebar/Sidebar'
import { UserProvider } from "../Hooks/userContext"
import MainNavbar from '../Components/general/navbar/navbar'

function Dashboard() {
  const token  = getLocalstorage("Token")
  const [allCreatedServers , setCreatedServers] = useState({})
  const [allJoinedServers , setJoinedServers] = useState({})
  const navigate = useNavigate()
  const [formstate , setFormState] = useState(false)

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
          setCreatedServers({head:"created servers",servers:response.data.servers})     
          setJoinedServers({head:"joined servers",servers:response.data.joinedServers})
          console.log(response.data.servers)
          console.log(response.data.joinedServers)
        }
        
      })
  }, [token])

  return (
    <>
      <MainNavbar 
        profile={<UserProvider children={<Profile/>} />}
      />
      <SideMenu 
        array={[allCreatedServers,allJoinedServers]}
        button={
          {
            state:formstate,
            onclick:setFormState
          }
        }
      />
      
      { 
        formstate ?
        <UserProvider
          children={
            <CreateServerForm 
              state={formstate}
              setState={setFormState}
            />
          }
        />
        :<></>
      }
      {/* <UserProvider children={<Profile/>} />
      <UserProvider children={<CreateServerForm/>} />
      <UserProvider children={<AllServers/>} />
    <ShowRequest/> */}
    </>
  )
}

export default Dashboard