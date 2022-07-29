import React, { useState, useEffect } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Message from "../components/Loading/Message";
import Progresser from "../components/Loading/Progresser";
import { login } from "../actions/userActions";

const LoginScreen = () => {
  //=> user login email and password state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin; // three of these distructures comes from user reducers

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigateTo(redirect); //if user login,then redirect
    }
  }, [navigateTo, userInfo, redirect]);

  //form event handler
  const emailHandler = (e) => setEmail(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);
  const submithandler = (e) => {
    e.preventDefault();
    //Dispatch login
    dispatch(login(email, password));
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Welcome to Tas Resort | Login</title>
      </Helmet>
      <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Progresser />}
        <Form onSubmit={submithandler}>
          {/* user email input */}
          <Form.Group controlId="email">
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
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Please Enter Your Password"
              onChange={passwordHandler}
              value={password}
              autoComplete="on"
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            variant="btn btn-outline-primary"
            className="my-3"
          >
            Sign In
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            No Account Yet?
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              {" "}
              Sign Up
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </HelmetProvider>
  );
};

export default LoginScreen;
