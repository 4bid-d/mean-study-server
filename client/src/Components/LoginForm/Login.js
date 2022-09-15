import { useRef, useState } from "react"
import React from 'react'
import Loading from "../Loading/Loading"

function Login() { 
  const [loading , setLoading] = useState(false)
  const password =  useRef()
  const username =  useRef()

  const sendLoginData = (e)=>{
    e.preventDefault()

    console.log(password.current.focus()
    , username.current.focus()
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