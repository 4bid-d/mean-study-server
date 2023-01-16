import React from 'react'
import "./style.css"

function Button({stateToggleFunction}) {

  return (
    <>
        <button className='new-server-button'
        onClick={()=>{
          stateToggleFunction()
        }}>
            <div className='button-data'>
              <span>New server</span>
              <img src='./images/plus.svg'/>
            </div>
        </button>
    </>
  )
}

export default Button