import React from 'react'
import "./signup.css"
import Loading from "../../Loading/Loading"
import { useState , useRef} from "react"
import {useNavigate} from "react-router-dom"
import {FetchRequest, UseFetch} from "../../../Hooks/useFetch"

import {
  VALIDATION_MESSAGES,
  PASSWORD_VALIDATION_REGEX,
  EMAIL_VALIDATION_REGEX,
  USERNAME_VALIDATION_REGEX
}  from "../../../config/formValidation"
import {getLocalstorage} from "../../../Hooks/useLocalstorage"
import { useEffect } from "react"

// const realtimeUsernameChecking = (username)=>{
  
//     console.log("checking username.")
//       UseFetch("post","usernameCheck",{
//         data : username, 
//       }).then((result)=>{
//         console.log(result)
//        alert(result)
//       })
    
// }
function Signup() {
  
  const [loading , setLoading] = useState(false)
  const password = useRef()
  const username = useRef()
  const email = useRef()
  const navigate = useNavigate()
  let token 
  useEffect(()=>{
    token = getLocalstorage("Token")
    if(token ) navigate("/")
    console.log(token)
  })
  if(loading) return <Loading/>
  // if(token) navigate("/")

  const validateSignupForm = () =>{
    const currentPass = password.current.value 
    const currentUsername = username.current.value 
    const currentEmail = email.current.value 
    if(
    currentPass === "" ||
    currentUsername === "" ||
    currentEmail === ""
    ){     
      if (!currentUsername) throw new Error( VALIDATION_MESSAGES.BASIC.USERNAME_REQUIRED)
      if (!currentEmail) throw new Error(   VALIDATION_MESSAGES.BASIC.EMAIL_REQUIRED)
      if (!currentPass) throw new Error( VALIDATION_MESSAGES.BASIC.PASSWORD_REQUIRED)
    }else{
      if(!EMAIL_VALIDATION_REGEX.test(currentEmail)) {
        console.log("validation email")
        if(!currentEmail.includes("@")) throw new Error( VALIDATION_MESSAGES.EMAIL_VALIDATION.REQUIRED_SYMBOL)
        if(!currentEmail.includes("mail"))  throw new Error( VALIDATION_MESSAGES.EMAIL_VALIDATION.ENTER_VALID_ADDRESS)
        if(!currentEmail.includes(".com")) throw new Error( VALIDATION_MESSAGES.EMAIL_VALIDATION.COM_ERROR)
        else throw new Error(  VALIDATION_MESSAGES.EMAIL_VALIDATION.ENTER_VALID_ADDRESS)
      }
      if(!PASSWORD_VALIDATION_REGEX.test(currentPass)) {
        if(currentPass.length < 8) throw new Error( VALIDATION_MESSAGES.PASSWORD_VALIDATION.MIN_LETTER_VALIDATION)
        if(currentPass.length > 12) throw new Error( VALIDATION_MESSAGES.PASSWORD_VALIDATION.MAX_LETTER_VALIDATION)     
        
      }
      if(USERNAME_VALIDATION_REGEX.test(currentUsername)) {        
          return true   
      }else {
        throw new Error(  VALIDATION_MESSAGES.USERNAME_VALIDATION.USERNAME_REGEX_VALIDATION)
      }
    }
}

const sendSignupData = (e)=>{
  
  try {
    
    e.preventDefault()
    if(validateSignupForm()) {
      setLoading(true)
      const newRequest = new FetchRequest()
      newRequest.postData("signup",{
        username : username.current.value,
        email : email.current.value,
        password : password.current.value,   
      }).then((result)=>{
        console.log(result)
        if(!result) throw new Error( VALIDATION_MESSAGES.BASIC.SOMETHING_WRONG)
        if(result.error) throw new Error(result.error)
        if(result.token) alert("SuccessFully signed up")
        // setLocalstorage("Token","")
        // setLocalstorage('Token', result.token)
        // if(result.Token) navigate("/login")
      }).catch((err)=>{
        alert(err)
      })
      setLoading(false)
    }
    else{
      throw new Error(VALIDATION_MESSAGES.BASIC.SOMETHING_WRONG) 
    }
  } catch (error) {
    console.log("errror")
    alert(error.message)
  }

  }
  return (
    // ()=>realtimeUsernameChecking(username.current.value)
    <>
    <div className="form-wrapper">
          <div className="signup-form-div container">
              <div className="head-wrapper">
              <h4>Signup Form</h4>
              </div>
            <form >
              <div className="user-email">
                <input className=" input-username" type="text" ref={username} placeholder="Username"required />
                <input  className="input-email" type="email" ref={email} placeholder="Email" required/>
              </div>
              <div>
                <input className="input-password"  type="password" ref={password} placeholder="Password" required />
              </div>
              <button className='button-signup' 
               type="submit" 
                onClick={
                  (e)=>{
                    try {
                      sendSignupData(e)
                    } catch (validationMassage) {
                      alert(validationMassage)
                    }
                  }
                }>Submit</button>
            </form>
          </div>
        </div>
    </>
)}

export default Signup


// const SPECIAL_CHARACTORS_REGEX = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

// if(!SPECIAL_CHARACTORS_REGEX.test(currentPass.length)) throw `Your password atleast contain one special character.` 
// for (let i = 0; i < currentPass.length; i++) {
  //   let character = currentPass.charAt(i);
  //   if (!isNaN(character * 1)){
    //      containsRequiredCharactors.number++
    //   }
    //   if (character == character.toUpperCase()) {
      //     containsRequiredCharactors.upperCaseLetter++
      //   } 
      //   if (character == character.toLowerCase()){
          //     containsRequiredCharactors.lowerCaseLetter++
          //   }
          
          // }
          // if(!containsRequiredCharactors.number||
          //   !containsRequiredCharactors.upperCaseLetter||
          //   !containsRequiredCharactors.lowerCaseLetter){
          //     throw `Your password fucked`
          //   }