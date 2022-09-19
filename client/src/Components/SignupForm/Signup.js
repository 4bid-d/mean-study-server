import React from 'react'
import Loading from "../Loading/Loading"
import { useState , useRef} from "react"
import {useNavigate} from "react-router-dom"
import {UseFetch} from "../../Hooks/useFetch"
const EMAIL_VALIDATION_REGEX = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/  
const PASSWORD_VALIDATION_REGEX  =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
const VALIDATION_MESSAGES={
  BASIC:[
    "Username is required.",
    "Email is required."  ,
    "Password is required.",
    "Something went wrong."
  ],
  EMAIL_VALIDATION:[        
    `Mail id should contain @ symbol.`,
    `Please enter valid email.`,
    `You have just missed a ".com" there.`
  ],
  PASSWORD_VALIDATION:[
    `Password should contain atleast 8 letters`,
    `Password should only contain less than 12 letters`
  ]
  
}

function Signup() {
  const [loading , setLoading] = useState(false)
  const password = useRef()
  const username = useRef()
  const email = useRef()
  const navigate  = useNavigate()
  if(loading) return <Loading/>
  
  const validateSignupForm = () =>{
    const currentPass = password.current.value 
    const currentUsername = username.current.value 
    const currentEmail = email.current.value 
    if(currentPass === "" ||
    currentUsername === "" ||
    currentEmail === ""
    ){
      if (!currentUsername) throw VALIDATION_MESSAGES.BASIC[0]
      if (!currentEmail) throw   VALIDATION_MESSAGES.BASIC[1]
      if (!currentPass) throw VALIDATION_MESSAGES.BASIC[2]
    }else{
        if(!EMAIL_VALIDATION_REGEX.test(currentEmail)) {
          if(!currentEmail.includes("@")) throw VALIDATION_MESSAGES.EMAIL_VALIDATION[0]
          if(!currentEmail.includes("mail"))  throw VALIDATION_MESSAGES.EMAIL_VALIDATION[1]
          if(!currentEmail.includes(".com")) throw VALIDATION_MESSAGES.EMAIL_VALIDATION[2]
          else throw  VALIDATION_MESSAGES.EMAIL_VALIDATION[1]
        }
        if(!PASSWORD_VALIDATION_REGEX.test(currentPass)) {
          if(currentPass.length < 8) throw VALIDATION_MESSAGES.PASSWORD_VALIDATION[0]
          if(currentPass.length > 12) throw VALIDATION_MESSAGES.PASSWORD_VALIDATION[1]
          return true
    }else{
        throw VALIDATION_MESSAGES.BASIC[3]
    }
    
  }
}

const sendSignupData = (e)=>{
 
  e.preventDefault()
  if(validateSignupForm()) {
      setLoading(true)
      UseFetch("post","signup",{
        username : username.current.value,
        email : email.current.value,
        password : password.current.value,
        
      }).then((result)=>{
       alert(result.message)
       localStorage.setItem('Token', result.token)
      })
      setLoading(false)
      // navigate("/login")
    }else{
      throw VALIDATION_MESSAGES.BASIC[3]
    }
  }
  return (
    <>
    <h4>Signup Form</h4>
    <form >
      <input type="text" placeholder="User name" ref={username} required/>
      <input type="email"  placeholder="Example@g mail.com" ref={email} required/>
      <input type="password" placeholder="Password" ref={password} required />
      <button type="submit" 
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
    <button onClick={()=> navigate("/login")}>
      Login
    </button>
    </>


)
}

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