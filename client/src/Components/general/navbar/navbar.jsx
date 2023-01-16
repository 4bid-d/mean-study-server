import React, { useContext } from 'react'
import { adminKeyContext } from '../../../Hooks/useAdminKey'
import "./navbar.css" 

function MainNavbar({head , profile }) {
  let adminSecret  = useContext(adminKeyContext)
  console.log(adminSecret ? adminSecret.key :"not an admin" )
  return (
    <>
     <nav className="navbar">
            <div className="brand-title">{head ? head : "Server_space"}</div>
            <a href="#" className="toggle-button">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </a>
            <div className="navbar-links">
                <ul>
                    <li><a href="/">Home</a></li>
                    {profile ? profile : <li><a href="/login">Login</a></li>}
                </ul>
            </div>
        </nav>
    </>
  )
}

export default MainNavbar