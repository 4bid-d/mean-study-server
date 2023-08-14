import "./login.css"
import React , { useRef, useState } from 'react'
import Loading from "../../Loading/Loading"
import {useNavigate} from "react-router-dom"
import {FetchRequest, UseFetch} from "../../../Hooks/useFetch"
import {setLocalstorage,getLocalstorage} from "../../../Hooks/useLocalstorage"
import {
  VALIDATION_MESSAGES,
}  from "../../../config/formValidation"
import { useEffect } from "react"
function Login() { 
  const [loading , setLoading] = useState(false)
  const password =  useRef()
  const username =  useRef()
  const email =  useRef()
  const navigate = useNavigate()
  useEffect(()=>{
    let data  = getLocalstorage("Token")
    if(data ) navigate("/")
    console.log(data)
  })
  const sendLoginData = (e)=>{
    e.preventDefault()
    const currentUsername =  username.current.value
    const currentPassword =  password.current.value
    const currentEmail =  email.current.value
    const newLoginRq = new FetchRequest()
    setLoading(true)
    console.log("sent to server")
      newLoginRq.postData("login",{
        username : currentUsername,
        email : currentEmail,
        password : currentPassword,   
      }).then((result)=>{
        if(!result) throw new Error(VALIDATION_MESSAGES.BASIC.SOMETHING_WRONG)
        if(result.error){
          alert(result.error)
        }
         if(result.token){
           setLocalstorage("Token","")
           setLocalstorage('Token', result.token)
           navigate("/")
          }
          setLoading(false)
      })
  }
  if(loading) return <Loading/>
  return (
    <>
      <div className="form-wrapper">
          <div className="login-form-div container">
              <div className="head-wrapper">
                <h4>Login Form</h4>
              </div>
            <form >
              <div className="user-email">
                <input className=" input-username" type="text" ref={username} placeholder="User name" />
                <input  className="input-email" type="email" ref={email} placeholder="Email" />
              </div>
              <div>
                <input className="input-password" style={{color:"green"}} type="password" ref={password} placeholder="Password" />
              </div>
                  <button className="button-login"   type="submit" onClick={
                    (e)=>{
                      try {
                        sendLoginData(e) 
                      } catch (error) {
                        alert(error.message)
                      }
                    }}>Submit</button>
      
            </form>
          </div>
        </div>
    </>

  )
}

export default Login