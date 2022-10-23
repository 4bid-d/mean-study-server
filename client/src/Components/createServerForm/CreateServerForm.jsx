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
    if(!name.current.value) throw new Error( SERVER_CREATION_MESSAGES.NAME_IS_REQUIRED)
    if (!user.token ) throw new Error(SERVER_CREATION_MESSAGES.PLEASE_RELOAD)
    UseFetch( "post" , `server/newServer` , {
      name : name.current.value
    }).then((response)=>{
      if(response.error) throw new Error(response.error)
      if(response.message) alert(response.message)
      if(response.JsonWebTokenError) alert(VERFICATIONAL_ERROR_MESSAGE.JWT_USER_NOT_BELONG)
    })

  } 
  return (
    <>
    <h4>Create Your own server.</h4>
      <form>
        <input type="text" placeholder="Server name"  ref={name} required/>
        <button type="submit" onClick={
          (e)=>{
           try {            
             createServer(e)
           } catch (error) {
             alert(error.message)
            // console.log(message)
           }
          }
        }>Create</button>
      </form>
    </>
  )
}

export default CreateServerForm