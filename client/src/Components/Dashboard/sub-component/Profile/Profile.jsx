import "./profile.css"
import React, { useContext } from 'react'
import { userDataContext } from "../../../../Hooks/userContext"
import { setLocalstorage } from "../../../../Hooks/useLocalstorage"
function Profile() {

  const user = useContext( userDataContext )
  const logout = () => {
    setLocalstorage("Token" , "")
    alert("Logout successfully completed.")
    Location.reload()
  }

  
  return (
    <>
    <div className="profile-button"> { user ? `${ user.username } `: "Profile" } </div>
    <div className="dropdown">
      <div>fjgkdf</div>
      <div>jfgsajgo</div>
      {/* <button onClick={ logout }> Logout </button> */}
    </div>
    </>
  )
}

export default Profile