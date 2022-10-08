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
        UseFetch("get",`server/${serverId}`)
        .then((result)=>{
            if(result.error) alert(result.error)
            if(result.redirect) navigate(result.redirect)
            setServerInstance(result.data)
            console.log(serverInstance)
        })
    }, [token])
    
  return (
    <>
     <h2>
        { serverInstance ? serverInstance.name :null}
     </h2>
     <h3>
         Admin : {serverInstance ? serverInstance.admin :null}
     </h3>
    </>
  )
}

export default Server