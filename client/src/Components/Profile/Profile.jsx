import React, { useEffect, useState } from 'react'
import {UseFetch} from "../../Hooks/useFetch"
import {
  getLocalstorage, setLocalstorage,
} from "../../Hooks/useLocalstorage"
import {useNavigate} from "react-router-dom"
import {API_BODY} from "../../config/api"
import {UseValidateToken} from "../../Hooks/UseValidateToken"

function Profile() {
  const navigate = useNavigate()
  const token = UseValidateToken()
  const [userdata , setUserdata] = useState({})
  const logout = ()=>{
    setLocalstorage("Token","")
    alert("Logout successfully completed.")
    Location.reload()
  }
  
  useEffect(() => { 

    if(!token){
      navigate("/login")
      return 
    }
      UseFetch("get",`user/${token}`)
      .then((result)=>{
        if(result){
          console.log(result)
          setUserdata(result)
        }
      })


  }, [])
  
  return (
    <>
    <div>{userdata ? `Welcome ${userdata.username} `: "Profile"}</div>
    <button onClick={logout}>Logout </button>
    </>
  )
}

export default Profile