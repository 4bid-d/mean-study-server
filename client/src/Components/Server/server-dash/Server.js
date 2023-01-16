import React, { useState } from 'react'
import Nfs from '../newsFeeds/Nfs'
import "./server.css"

function Server({server}) {
  const members = server.members
  const membersList = members ? members.map((member,key)=><div key={key}>{member}</div>) : null    
  return (
    <>
      <div className='server-main position-relative top-6'>
        <div>
          <h1>Server</h1>
          <h3>
              Admin : {server ? server.admin :null}
          </h3>
        </div>
        <div className='d-flex align-items-center justify-content-center'>
          <Nfs feeds={server.feeds}/>
        </div>
      </div>
    </>
  )
}

export default Server