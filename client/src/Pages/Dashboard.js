import React, { useEffect, useState ,useContext } from 'react'
import { UseFetch } from '../Hooks/useFetch'
import { userDataContext } from '../Hooks/userContext'
import {SERVER_CREATION_MESSAGES} from "../config/serverCreation"
import { getLocalstorage } from '../Hooks/useLocalstorage'
import { useNavigate } from 'react-router-dom'

import CreateServerForm from '../Components/createServerForm/CreateServerForm'
import AllServers from '../Components/Dashboard/sub-component/dropdown/Dropdown'
import Profile from '../Components/Dashboard/sub-component/Profile/Profile'
import ShowRequest from '../Components/request/ShowRequest/ShowRequest'
import SideMenu from '../Components/Dashboard/sidebar/Sidebar'
import { UserProvider } from "../Hooks/userContext"
import MainNavbar from '../Components/Dashboard/navbar/navbar'
function Dashboard() {


  const token  = getLocalstorage("Token")
  const [allCreatedServers , setCreatedServers] = useState({})
  const [allJoinedServers , setJoinedServers] = useState({})
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
          setCreatedServers({head:"created servers",servers:response.data.servers})     
          setJoinedServers({head:"joined servers",servers:response.data.joinedServers})     
        }
        
      })
  }, [token])
  return (
    <>
    <MainNavbar profile={<UserProvider children={<Profile/>} />} />
    <SideMenu array={[allCreatedServers,allJoinedServers]}/>
    {/* <UserProvider children={<Profile/>} />
    <UserProvider children={<CreateServerForm/>} />
    <UserProvider children={<AllServers/>} />
    <ShowRequest/> */}
    </>
  )
}

export default Dashboard