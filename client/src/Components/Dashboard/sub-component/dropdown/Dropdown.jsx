import "./dropdown.css"
import React, { useEffect, useState ,useContext } from 'react'

function dropdown({array ,members,admin}) {
  
  const dropdownButton = (children)=>(
    <div className="drop-down" >
      {children}
    </div>
  )

  if(array) return (
    <>
      <div>
        {
          array.map((obj)=>(

            <div className="drop-down" >
              <h3>{obj.head}</h3>
                  <div className="created-servers dropdown-content">
                    {obj.servers ?  obj.servers.map((obj,key)=>(
                        <>
                          <div>
                            <a key={key}  href={`/server/${obj._id}`} >
                              <h5>
                                {obj.name}
                              </h5>
                            </a>
                          </div>
                        </>
                      )) : "Not available."
                    }
              </div>
            </div>
          ))
        }

      </div>
    </>
  )
  
  if(members) return (
    <>
      <div>
        {
        

            <div className="drop-down" >
            <h3>Members</h3>
                <div className="created-servers dropdown-content">
                  {members ?  members.map((member ,key)=>(
                      <>
                        <div>
                          <h5 key={key} >{member}</h5>
                        </div>
                      </>
                    )) : "Not available."
                  }
            </div>
          </div>

        }
      </div>
  </>
  )
  
}

export default dropdown
