import React from 'react'
import { useParams } from 'react-router-dom'
import { UseFetch } from '../../../Hooks/useFetch'
import { getLocalstorage } from '../../../Hooks/useLocalstorage'

function Invitation() {

    const {serverId} = useParams()
    const token =  getLocalstorage("Token")
    const sendRequest= ()=>{
        if(!token) document.location.href = "/login"
        console.log(serverId+token)
        UseFetch("get",`invite/${token}/${serverId}d`)
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