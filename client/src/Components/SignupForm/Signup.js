import React from 'react'
import Loading from "../Loading/Loading"
import { useState , useRef} from "react"
import {useNavigate} from "react-router-dom"
import {UseFetch} from "../../Hooks/useFetch"
import {
  VALIDATION_MESSAGES,
  PASSWORD_VALIDATION_REGEX,
  EMAIL_VALIDATION_REGEX,
  USERNAME_VALIDATION_REGEX
}  from "../../config/formValidation"
let usernameArray = []
UseFetch("get","user/username")
.then(
  (res) => {
    usernameArray =  res.usernames
    
  }
)        
function checkUserName (currentUsername) {
  for(let i =  0 ; i < usernameArray.length ; i++){
    if(usernameArray[i].includes(currentUsername)){
      alert("username is not available.")
      return true
    } 
    else{
    continue      
    }
  }
}
function Signup() {
  const [loading , setLoading] = useState(false)
  const password = useRef()
  const username = useRef()
  const email = useRef()
  const navigate  = useNavigate()
  if(loading) return <Loading/>
  

  const validateSignupForm = async() =>{
    const currentPass = password.current.value 
    const currentUsername = username.current.value 
    const currentEmail = email.current.value 
    if(
    currentPass === "" ||
    currentUsername === "" ||
    currentEmail === ""
    ){
      if (!currentUsername) throw VALIDATION_MESSAGES.BASIC.USERNAME_REQUIRED
      if (!currentEmail) throw   VALIDATION_MESSAGES.BASIC.EMAIL_REQUIRED
      if (!currentPass) throw VALIDATION_MESSAGES.BASIC.PASSWORD_REQUIRED
    }else{
        if(USERNAME_VALIDATION_REGEX.test(currentUsername)) {
          if(checkUserName(currentUsername.toString())) {
            return false 
          }
        }else {
          throw  VALIDATION_MESSAGES.USERNAME_VALIDATION.USERNAME_REGEX_VALIDATION
        }
        if(!EMAIL_VALIDATION_REGEX.test(currentEmail)) {
          if(!currentEmail.includes("@")) throw VALIDATION_MESSAGES.EMAIL_VALIDATION.REQUIRED_SYMBOL
          if(!currentEmail.includes("mail"))  throw VALIDATION_MESSAGES.EMAIL_VALIDATION.ENTER_VALID_ADDRESS
          if(!currentEmail.includes(".com")) throw VALIDATION_MESSAGES.EMAIL_VALIDATION.COM_ERROR
          else throw  VALIDATION_MESSAGES.EMAIL_VALIDATION.ENTER_VALID_ADDRESS
        }
        if(!PASSWORD_VALIDATION_REGEX.test(currentPass)) {
          if(currentPass.length < 8) throw VALIDATION_MESSAGES.PASSWORD_VALIDATION.MIN_LETTER_VALIDATION
          if(currentPass.length > 12) throw VALIDATION_MESSAGES.PASSWORD_VALIDATION.MAX_LETTER_VALIDATION
          return true
        }else{
          throw VALIDATION_MESSAGES.BASIC.SOMETHING_WRONG
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