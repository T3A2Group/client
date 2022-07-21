import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { ReactComponent as Logo } from "../assets/Tasmania-Resort-Logo.svg";
import { logout } from "../actions/userActions";

const NavbarSet = () => {
  //need userInfo state to check if user login or not and depends on that to render component
  const dispatch = useDispatch();
  const nagivateTo = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    // console.log("logout");
    dispatch(logout());
    nagivateTo("/login"); //when user logout, nagivate to login page again
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <Logo
              className="d-inline-block align-top"
              style={{ width: "40", height: "30" }}
            />{" "}
            Tasmania Resort
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <LinkContainer to="/villa">
              <Nav.Link>
                <i className="fa-solid fa-bed"></i> Resort
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/food">
              <Nav.Link>
                <i className="fa-solid fa-utensils"></i> Food
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/specialty">
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
            {userInfo ? (
              <NavDropdown
                title={
                  <>
                    <img
                      className="user_image"
                      src="https://i.ibb.co/r3xBmkW/avatar.png"
                      alt="user pic"
                      style={{ width: "20px", height: "20px" }}
                    />{" "}
                    {userInfo.name}
                  </>
                }
                id="username"
              >
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i> Sign In
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarSet;
