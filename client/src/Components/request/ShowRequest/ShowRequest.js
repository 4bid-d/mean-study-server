import React, { useEffect, useState } from 'react'
import { UseFetch } from '../../../Hooks/useFetch'

function ShowRequest() {

    const [requests , setRequests] = useState([])
    const listOfRequests = requests.map((object,key) =>
    <div key={key}>
        <h5>
            {object.by} sent a requset to join your "{object.server.name}" server
        </h5>
    </div>
     )
    useEffect(() => {
        UseFetch("get","invite/all")
        .then((result)=>{
            result.error ? console.log("You dont have any requests currently.") : setRequests(result.Requests)
        })
    }, [])
    
  return (
    <>
    Requests:
    {listOfRequests}
    </>
  )
}

export default ShowRequest