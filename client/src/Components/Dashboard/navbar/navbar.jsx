import React from 'react'
import "./navbar.css" 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
function MainNavbar() {
  return (
    <>
     <nav className="navbar">
            <div className="brand-title">Server space</div>
            <a href="#" className="toggle-button">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </a>
            <div className="navbar-links">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
            </div>
        </nav>
    </>
  )
}

export default MainNavbar