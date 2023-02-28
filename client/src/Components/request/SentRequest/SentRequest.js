import React from 'react'
import { useParams } from 'react-router-dom'
import { FetchRequest} from '../../../Hooks/useFetch'
import { getLocalstorage } from '../../../Hooks/useLocalstorage'

function Invitation() {

    const {serverId} = useParams()
    const token =  getLocalstorage("Token")
    const newRequest = new FetchRequest()
    const sendRequest= ()=>{
        if(!token) document.location.href = "/login"
        newRequest.getData(`invite/${serverId}`)
        .then((result)=>{
            console.log(result)
        })
    }
    return (
        <div>
            <h4>
                You Dont have access to this server
                but you can send request to the admin.
            </h4>
            <button
            onClick={sendRequest}
            >
                Sent join request
            </button>
        </div>
    )
}

export default Invitation