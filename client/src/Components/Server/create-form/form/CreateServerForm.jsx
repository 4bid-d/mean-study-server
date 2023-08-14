import "./style.css"
import React,{ useContext } from 'react'
import { useRef } from 'react'
import { FetchRequest } from '../../../../Hooks/useFetch'
import { userDataContext } from "../../../../Hooks/userContext"
import { SERVER_CREATION_MESSAGES } from "../../../../config/serverCreation"
import { VERFICATIONAL_ERROR_MESSAGE } from "../../../../config/jwtVerificationErr"

function CreateServerForm({toggleFormState,serverArray}) {
  const name = useRef()
  const user = useContext( userDataContext )
  const createServerRequest = new FetchRequest()
  const reload = ()=>{
    window.location.reload()
  }
  const createServer = (e)=>{
    console.log(user)
    e.preventDefault()
    if(!name.current.value) throw new Error( SERVER_CREATION_MESSAGES.NAME_IS_REQUIRED)
    if (!user.token ) throw new Error(SERVER_CREATION_MESSAGES.PLEASE_RELOAD)
    createServerRequest.postData(`server` , {
      name : name.current.value
    }).then((response)=>{
      console.log(response)
      if(response.error) throw new Error(response.error)
      if(response.message) alert(response.message)
      if(response.JsonWebTokenError) alert(VERFICATIONAL_ERROR_MESSAGE.JWT_USER_NOT_BELONG)
      serverArray.push({name : response.server.name , _id :response.server._id })
    })

  } 
  return (
    <>
      <div className='background'>
        <div className='form-div' id='form-div'>
          <div className='meta-data'>
            <h6>Create Your own server.</h6>
            <button className='close-btn' 
              onClick={()=>{
                toggleFormState()
              }}>
                <img src='./images/close.svg'/>
            </button>
          </div>
          <form className="create-server-form">
            <input type="text" placeholder="Server name"  ref={name} required/>
            <button type="submit" onClick={
              (e)=>{
                try {            
                  createServer(e)
                  toggleFormState()
                  reload()
                } catch (error) {
                  alert(error.message)
                }
              }
            }>Create</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateServerForm