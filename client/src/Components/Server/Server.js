import React, { useState } from 'react'
import "./server.css"

function Server({server}) {
  const members = server.members
  const membersList = members ? members.map((member,key)=><div key={key}>{member}</div>) : null 
  console.log(server)        
  return (
    <>
      <div className='server-main'>
        <h1>Server</h1>
        <h3>
            Admin : {server ? server.admin :null}
        </h3>
      </div>
    </>
  )
}

export default Server