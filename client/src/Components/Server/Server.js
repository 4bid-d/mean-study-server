import React, { useState } from 'react'
import { useEffect } from 'react';
import {useNavigate, useParams} from "react-router-dom"
import { UseFetch } from '../../Hooks/useFetch';
import { getLocalstorage } from '../../Hooks/useLocalstorage';

function Server() {
    const { serverId } = useParams();
    const token = getLocalstorage("Token") 
    const navigate = useNavigate()
    const [serverInstance , setServerInstance] = useState({})
    useEffect(() => {
        if(!token) navigate("/login")
        UseFetch("get",`server/${token}/${serverId}`)
        .then((result)=>{
            if(result.error) alert(result.error)
            setServerInstance(result.data)
            console.log(serverInstance)
        })
    }, [token])
    
  return (
    <>
     <h2>
        { serverInstance.name ? serverInstance.name :null}
     </h2>
     <h3>
         Admin : {serverInstance.admin ? serverInstance.admin :null}
     </h3>
    </>
  )
}

export default Server