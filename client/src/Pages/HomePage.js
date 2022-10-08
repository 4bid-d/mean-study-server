import React from 'react'
import CreateServerForm from '../Components/createServerForm/CreateServerForm'
import AllServers from '../Components/displayServers/AllServers'
import Profile from '../Components/Profile/Profile'
import ShowRequest from '../Components/request/ShowRequest/ShowRequest'
import { UserProvider } from "./../Hooks/userContext"
function HomePage() {
  
  return (
    <>
    <UserProvider children={<Profile/>} />
    <UserProvider children={<CreateServerForm/>} />
    <UserProvider children={<AllServers/>} />
    <ShowRequest/>
    </>
  )
}

export default HomePage