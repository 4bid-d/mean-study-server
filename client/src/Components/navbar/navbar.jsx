import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
function MainNavbar() {
  return (
    <>
     <Navbar bg="dark" sticky="top"  variant="dark">
        <Container>
          <Navbar.Brand href="/home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default MainNavbar