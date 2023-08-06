import React, { useContext } from 'react'
import { adminKeyContext } from '../../../Hooks/useAdminKey'
import "./navbar.css" 

function MainNavbar({head , profile }) {
  let adminSecret  = useContext(adminKeyContext)
  console.log(adminSecret ? adminSecret.key :"not an admin" )
  return (
    <>
     <nav className="navbar row">
            <div className="nav-title col-lg-2 col-md-4 col-sm-12 ">
              {/* <a href="#" className="toggle-button ">
                  <span className="bar"></span>
                  <span className="bar"></span>
                  <span className="bar"></span>
              </a> */}
            
              <div className='navbar-brand text-white'>
                {head ? head : "Server_space"}
              </div>
            </div>
            <div className="navbar-links col-lg-3 col-md-3">
                <a href="/">Home</a>
                {profile ? profile : <a href="/login">Login</a>}
            </div>
      </nav>
    </>
  )
}

export default MainNavbar