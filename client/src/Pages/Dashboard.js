import React from 'react'
import CreateServerForm from '../Components/createServerForm/CreateServerForm'
import AllServers from '../Components/Dashboard/sub-component/displayServers/AllServers'
import Profile from '../Components/Dashboard/sub-component/Profile/Profile'
import ShowRequest from '../Components/request/ShowRequest/ShowRequest'
import SideMenu from '../Components/Dashboard/sidebar/Sidebar'
import { UserProvider } from "../Hooks/userContext"
import MainNavbar from '../Components/Dashboard/navbar/navbar'
function Dashboard() {
  
  return (
    <>
    <MainNavbar/>
    <SideMenu/>
    {/* <UserProvider children={<Profile/>} />
    <UserProvider children={<CreateServerForm/>} />
    <UserProvider children={<AllServers/>} />
    <ShowRequest/> */}
    </>
  )
}

export default Dashboard