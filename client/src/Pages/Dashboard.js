import React, { useEffect, useState ,useContext,useRef } from 'react'
import { FetchRequest } from '../Hooks/useFetch'
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
import Button from '../Components/Server/create-form/button/Button'
import Notifications from '../Components/general/sub-component/notifications/Notifications'

function Dashboard() {
  let token
  const [allCreatedServers , setCreatedServers] = useState({})
  const [allJoinedServers , setJoinedServers] = useState({})
  const navigate = useNavigate()
  const newRequest = new FetchRequest()
  useEffect(() => {
    token  = getLocalstorage("Token")
    if (!token ) {
      navigate("/login")
      console.log(token)
      return
    }
    newRequest.getData("server-ref")
    .then((response)=> {
      if(response.JsonWebTokenError) {
            return
        }
        if(response.error) {
          console.log(response.error)
          return 
        }
        if(response){
          console.log(response)
          setCreatedServers({head:"created servers",servers:response.data.servers})     
          setJoinedServers({head:"joined servers",servers:response.data.joinedServers})
        }
        
      })
  }, [token])

  function setFormOn(){
    const createFormEntireDiv = document.querySelector(".background")
    const formDiv = document.querySelector(".form-div")
    createFormEntireDiv.classList.toggle("active")
    formDiv.classList.add("animate")
  }

  return (
    <>
      <MainNavbar 
        profile={<UserProvider children={<Profile/>} />}
      />
      <SideMenu 
        array={[allCreatedServers,allJoinedServers]}
        button={
          <Button stateToggleFunction={setFormOn}/>
        }
        form ={
          <UserProvider
            children={
              <CreateServerForm 
                toggleFormState={setFormOn}
                serverArray={allCreatedServers.servers}
              />
            }
          /> 
        }
      />
      {/* <UserProvider
        children={
          <CreateServerForm 
            toggleFormState={setFormOn}
            serverArray={allCreatedServers.servers}
          />
        }
      /> */}
      {/* <Notifications />      */}
      {/* <ShowRequest/> */}
      {/* { 
        formstate ?
        :<></>
      } */}
      {/* <UserProvider children={<Profile/>} />
      <UserProvider children={<CreateServerForm/>} />
      <UserProvider children={<AllServers/>} />
    <ShowRequest/> */}
    </>
  )
}

export default Dashboard