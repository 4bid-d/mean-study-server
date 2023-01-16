import React, { useState } from 'react'
import "./style.css"

function Notifications() {
    const [ntfState , setNtfState] = useState()
    
    if(ntfState) return(
        // <div className='ntf-container'>                    
            <div className='ntf-div'>
                <div className='ntf-meta-data'>
                    <div className='head'>Notifications</div>
                    <button className='ntf-close-btn'
                    onClick={()=>{
                        setNtfState(false)
                    }}>
                        <img  className='ntf-close-img' src='../images/down.svg'></img>
                    </button>
                </div>
                <div className='ntf-field'>Field</div>
            </div>
        // </div>
    )

    return (
        <button className='nfs-button'
            onClick={()=>{
                setNtfState(true)
            }}
        >
            <img className='nfs-image' src='./images/notification.svg'></img>
        </button>
    )

}

export default Notifications