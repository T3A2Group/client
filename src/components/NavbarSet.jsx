import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";

const NavbarSet = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Tasmania Resort</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <LinkContainer to="/resort">
              <Nav.Link>
                <i className="fa-solid fa-bed"></i> Resort
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/food">
              <Nav.Link>
                <i className="fa-solid fa-utensils"></i> Food
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/specialties">
              <Nav.Link>
                <i className="fa-solid fa-gifts"></i> Specialties
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/travel">
              <Nav.Link>
                <i className="fa-solid fa-route"></i> Travel
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/login">
              <Nav.Link>
                <i className="fas fa-user"></i> Sign In
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarSet;
