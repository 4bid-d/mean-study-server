import React from 'react'
import "./style.css"

function Button({state,stateToggleFunction}) {

  return (
    <>
        <button className='new-server-button' 
        onClick={()=>{
          stateToggleFunction(!state)
        }}>
            <div>
              <span>New server</span>
              <img src='./images/plus.svg'/>
            </div>
        </button>
    </>
  )
}

export default Button