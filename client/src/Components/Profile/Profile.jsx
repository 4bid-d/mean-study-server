import React, { useContext } from 'react'
import { userDataContext } from "../../Hooks/userContext"
import { setLocalstorage } from "../../Hooks/useLocalstorage"
function Profile() {

  const user = useContext( userDataContext )
  const logout = () => {
    setLocalstorage("Token" , "")
    alert("Logout successfully completed.")
    Location.reload()
  }

  
  return (
    <>
    <div> { user ? `Welcome ${ user.username } `: "Profile" } </div>
    <button onClick={ logout }> Logout </button>
    </>
  )
}

export default Profile