import React from 'react'
import {useParams} from "react-router-dom"
function ServerPage() {
    let { serverId } = useParams();
  return (
    <div>{serverId}</div>
  )
}

export default ServerPage