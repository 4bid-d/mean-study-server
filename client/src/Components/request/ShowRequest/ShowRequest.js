import React, { useEffect, useState } from 'react'
import { FetchRequest} from '../../../Hooks/useFetch'
import "./style.css"
function ShowRequest() {

    const [requests , setRequests] = useState([])
    const newRequest  = new FetchRequest()
    const sendDecision = (decision,inviteID)=>{
        let urlEncodeData = encodeURIComponent(
        JSON.stringify({
            inviteID,
            decision
        }))
         
        let url = `invite/requestDecision/${urlEncodeData}`
        newRequest.getData(url)
        .then((result)=>{
            return result
        })
    }
    const listOfRequests = requests.map((object,key) =>
    <div key={key}>
        <h5>
            {object.by} sent a requset to join your "{object.server.name}" server
        </h5>
        <button onClick={(e) => sendDecision(true,object.id)}>Accept</button>
        <button onClick={(e) => sendDecision(false,object.id)}>Reject</button>
    </div>
     )
    useEffect(() => {
        newRequest.getData("invite/")
        .then((result)=>{
            result.error ? console.log("You dont have any requests currently.") : setRequests(result.Requests)
        })
    }, [])
    
  return (
    <>
    <div className='requests-div'>
        Requests:
        {listOfRequests}
    </div>
    </>
  )
}

export default ShowRequest