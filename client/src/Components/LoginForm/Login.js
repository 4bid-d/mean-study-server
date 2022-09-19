import { useRef, useState } from "react"
import React from 'react'
import Loading from "../Loading/Loading"

function Login() { 
  const [loading , setLoading] = useState(false)
  const password =  useRef()
  const username =  useRef()

  const sendLoginData = (e)=>{
    e.preventDefault()
    const currentUsername =  username.current.value
    const currentPassword =  username.current.value
    console.log(
      currentPassword,
      currentUsername
    )
  }
  if(loading) return <Loading/>
  return (
    <>
    <h4>Login Form</h4>
    <form >
      <input type="text" ref={username} placeholder="User name" />
      <input type="password" ref={password} placeholder="Password" />
      <button type="submit" onClick={(e)=> sendLoginData(e)}>Submit</button>
    </form>
    </>

  )
}

export default Login