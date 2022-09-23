import React,{ useState , useEffect ,useContext } from 'react'
import { useRef } from 'react'
import { UseFetch } from '../../Hooks/useFetch'
import { userDataContext } from "../../Hooks/userContext"

function CreateServerForm() {
  const name = useRef()
  const user = useContext( userDataContext )
  const createServer = (e)=>{
    e.preventDefault()
    if(!name.current.value) throw "Name is required."
    if (!user.token ) throw "Please reload somthing went wrong." 
    UseFetch( "post" , `server/${user.token}/newServer` , {
      name : name.current.value
    }).then((response)=>{
      console.log(response)
      if(response.message) alert(response.message)
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
             alert(message)
           }
          }
        }>Create</button>
      </form>
    </>
  )
}

export default CreateServerForm