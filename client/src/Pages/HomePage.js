import React from 'react'
import CreateServerForm from '../Components/createServerForm/CreateServerForm'
import AllServers from '../Components/displayServers/AllServers'
import Profile from '../Components/Profile/Profile'
function HomePage() {
  
  return (
    <>
    <Profile/>
    <CreateServerForm/>
    <AllServers/>
    </>
  )
}

export default HomePage