import MainNavbar from '../Components/general/navbar/navbar'
import Server from '../Components/Server/server-dash/Server'
import React, { useState,useEffect } from 'react'
import {useNavigate, useParams} from "react-router-dom"
import { UseFetch } from '../Hooks/useFetch';
import { getLocalstorage } from '../Hooks/useLocalstorage';
import SideMenu from '../Components/general/sidebar/Sidebar';
import { UserProvider } from "../Hooks/userContext"
import Profile from '../Components/general/sub-component/Profile/Profile';

function ServerPage() {

  const { serverId } = useParams();
  const token = getLocalstorage("Token") 
  const navigate = useNavigate()
  const [serverInstance , setServerInstance] = useState({})
  
  useEffect(() => {
      if(!token) navigate("/login")
      UseFetch("get",`server/${serverId}`)
      .then((result)=>{
          if(result.error) alert(result.error)
          if(result.redirect) navigate(result.redirect)
          setServerInstance(result.data)
      })
  }, [token])
  return (
    <>
    <MainNavbar 
      head={serverInstance.name} 
      profile={<UserProvider children={<Profile/>}/> 
    }/>
    <SideMenu members={serverInstance.members}/>
    <Server server={serverInstance}/>
    </>
  )
}

export default ServerPage