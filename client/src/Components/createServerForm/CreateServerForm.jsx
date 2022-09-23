import React,{ useState , useEffect ,useContext } from 'react'
import { useRef } from 'react'
import { userDataContext } from "../../Hooks/userContext"

function CreateServerForm() {
  const name = useRef()
  const user = useContext( userDataContext )
  const createServer = (e)=>{
    e.preventDefault()
    if (!user.token ) throw "Please reload somthing went wrong." 
    console.log(user)

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
             alert(message)
           }
          }
        }>Create</button>
      </form>
    </>
  )
}

export default CreateServerForm