import React, { useState } from 'react'
import {UseFetch} from "../../Hooks/useFetch"
import {
  getLocalstorage,
} from "../../Hooks/useLocalstorage"
import {useNavigate} from "react-router-dom"
import {API_BODY} from "../../config/api"
const axios = require('axios').default;

function Profile() {
  
  const navigate = useNavigate()
  const token = getLocalstorage("Token")
  const [userdata , setUserdata  ] = useState()
  let data = {}
  if(token){
      axios.get(`${API_BODY}user/${token}`)
        .then(function (response) {
          data = response.data
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // setUserdata(data)
        });
        
  }else{
  
    navigate("/login")
  
  }
  
  return (
    <div>Profile</div>
  )
}

export default Profile