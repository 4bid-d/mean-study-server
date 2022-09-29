import React , { useRef, useState } from 'react'
import Loading from "../Loading/Loading"
import {useNavigate} from "react-router-dom"
import {UseFetch} from "../../Hooks/useFetch"
import {setLocalstorage} from "../../Hooks/useLocalstorage"
import {
  VALIDATION_MESSAGES,
  
}  from "../../config/formValidation"
function Login() { 
  const [loading , setLoading] = useState(false)
  const password =  useRef()
  const username =  useRef()
  const email =  useRef()
  const navigate = useNavigate()
  const sendLoginData = (e)=>{
    e.preventDefault()
    const currentUsername =  username.current.value
    const currentPassword =  password.current.value
    const currentEmail =  email.current.value
    setLoading(true)
    console.log("sent to server")
      UseFetch("post","login",{
        username : currentUsername,
        email : currentEmail,
        password : currentPassword,   
      }).then((result)=>{
        if(!result) throw VALIDATION_MESSAGES.BASIC.SOMETHING_WRONG
        console.log(result)
        console.log(result)
         alert(result.message)
         if(result.token){
           setLocalstorage("Token","")
           setLocalstorage('Token', result.token)
           navigate("/")
          }
      })
      setLoading(false)
  }
  if(loading) return <Loading/>
  return (
    <>
    <h4>Login Form</h4>
    <form >
      <input type="text" ref={username} placeholder="User name" />
      <input type="email" ref={email} placeholder="Email" />
      <input type="password" ref={password} placeholder="Password" />
      <button type="submit" onClick={
        (e)=>{
          try {
            sendLoginData(e) 
          } catch (validationMassage) {
            alert(validationMassage)
          }
        }}>Submit</button>
    </form>
    </>

  )
}

export default Login