import React, { useState, useEffect } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Message from "../components/Loading/Message";
import Progresser from "../components/Loading/Progresser";
import { register } from "../actions/userActions";

const RegisterScreen = () => {
  //=> user register name, email, password and confirmPassword state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const location = useLocation();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister; // three of these distructures comes from user reducers

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigateTo(redirect); //if user register,then redirect
    }
  }, [navigateTo, userInfo, redirect]);

  //form event handler
  const nameHandler = (e) => setName(e.target.value);
  const emailHandler = (e) => setEmail(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);
  const confirmPasswordHandler = (e) => setConfirmPassword(e.target.value);
  const submithandler = (e) => {
    e.preventDefault();
    //Dispatch register
    if (password !== confirmPassword) {
      setMessage(
        "Passwords do not match,Your Confirm Password needs to same as Your Password"
      );
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Welcome to Tas Resort | Register</title>
      </Helmet>
      <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Progresser />}
        <Form onSubmit={submithandler}>
          {/* user name input */}
          <Form.Group controlId="name">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Please Enter Your username"
              onChange={nameHandler}
              value={name}
              autoComplete="on"
            ></Form.Control>
          </Form.Group>

          {/* user email input */}
          <Form.Group controlId="email" className="my-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Please Enter Your Email"
              onChange={emailHandler}
              value={email}
              autoComplete="on"
            ></Form.Control>
          </Form.Group>

          {/* user password input */}
          <Form.Group controlId="password" className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Please Enter Your Password"
              onChange={passwordHandler}
              value={password}
              autoComplete="on"
            ></Form.Control>
          </Form.Group>

          {/* user password input */}
          <Form.Group controlId="confirmPassword" className="my-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Please Confirm Your Password"
              onChange={confirmPasswordHandler}
              value={confirmPassword}
              autoComplete="on"
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            variant="btn btn-outline-primary"
            className="my-3"
          >
            Register
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Already Have an Account?
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              {" "}
              Log In
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </HelmetProvider>
  );
};

export default RegisterScreen;
