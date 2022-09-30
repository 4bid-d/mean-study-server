import React,{ useState , useEffect ,useContext } from 'react'
import { useRef } from 'react'
import { UseFetch } from '../../Hooks/useFetch'
import { userDataContext } from "../../Hooks/userContext"
import { SERVER_CREATION_MESSAGES } from "../../config/serverCreation"
import { VERFICATIONAL_ERROR_MESSAGE } from "../../config/jwtVerificationErr"
function CreateServerForm() {
  const name = useRef()
  const user = useContext( userDataContext )

  
  const createServer = (e)=>{
    e.preventDefault()
    if(!name.current.value) throw SERVER_CREATION_MESSAGES.NAME_IS_REQUIRED
    if (!user.token ) throw SERVER_CREATION_MESSAGES.PLEASE_RELOAD
    UseFetch( "post" , `server/${user.token}/newServer` , {
      name : name.current.value
    }).then((response)=>{
      if(response.error) alert(response.error)
      if(response.message) alert(response.message)
      if(response.JsonWebTokenError) alert(VERFICATIONAL_ERROR_MESSAGE.JWT_USER_NOT_BELONG)
    })

  } 
  return (
    <>
    <h4>Signup Form</h4>
      <form>
        <input type="text" placeholder="Server name"  ref={name} required/>
        <button type="submit" onClick={
          (e)=>{
           try {            
             createServer(e)
           } catch (message) {
            //  alert(message)
            console.log(message)
           }
          }
        }>Create</button>
      </form>
    </>
  )
}

export default CreateServerForm