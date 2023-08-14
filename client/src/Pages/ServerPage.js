import MainNavbar from '../Components/general/navbar/navbar'
import Server from '../Components/Server/server-dash/Server'
import React, { useState,useEffect } from 'react'
import {useNavigate, useParams} from "react-router-dom"
import { FetchRequest } from '../Hooks/useFetch';
import { getLocalstorage } from '../Hooks/useLocalstorage';
import SideMenu from '../Components/general/sidebar/Sidebar';
import { UserProvider } from "../Hooks/userContext"
import Profile from '../Components/general/sub-component/Profile/Profile';
import { AdminKeyProvider } from '../Hooks/useAdminKey';
import {sideBarToggler} from "../utils/toggle"
function ServerPage() {
  
  const { serverId } = useParams();
  const token = getLocalstorage("Token") 
  const navigate = useNavigate()
  const [serverInstance , setServerInstance] = useState({})
  const newRequest = new FetchRequest()
  const toogle = sideBarToggler()
  useEffect(() => {
      if(!token) navigate("/login")
      newRequest.getData(`server/${serverId}`)
      .then((result)=>{
          if(result.error) alert(result.error)
          if(result.redirect) navigate(result.redirect)
          setServerInstance(result.data)
        })
      }, [token])
     
    
  return (
    <>
      <AdminKeyProvider 
       children={
        <MainNavbar 
          head={serverInstance.name} 
          profile={<UserProvider children={<Profile/>}
          /> 
        }/>}
        adminKey={serverInstance.adminKey ?? null}
      />

      <AdminKeyProvider children={
        <SideMenu members={serverInstance.members}/>
      }
      adminKey={serverInstance.adminKey ?? null}
      />

      <AdminKeyProvider children={
        <Server server={serverInstance}/>
      }
      adminKey={serverInstance.adminKey ?? null}
      />
    </>
  )
}

export default ServerPage