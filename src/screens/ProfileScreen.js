import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Loading/Message";
import Progresser from "../components/Loading/Progresser";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { listMyOrders } from "../actions/orderActions";
import { LinkContainer } from "react-router-bootstrap";

const ProfileScreen = () => {
  //=> user name, email, password and confirmPassword state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  //grab store states in here,start:
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails; // three of these distructures comes from user reducers/userDetailsReducer

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile; // success comes from user reducers/userUpdateProfileReducer

  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList; // three of these distructures comes from order reducers/orderMyListReducer
  //end!

  useEffect(() => {
    if (!userInfo) {
      navigateTo("/login"); //if user doesn't login,then redirect to login when they want to check profile
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile")); //in this case, profile will pass into userActions/getUserDetails, and the id will be the profile
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigateTo, userInfo, user, success]);

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
      //dispatch update user profile
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col lg={4}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {/* {success && (
          <Message variant="success">Profile Successfully Updated</Message>
        )} */}
        {/* use React-toastify to instead */}
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

          {/* user password input */}
          <Form.Group controlId="confirmPassword">
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
            Update
          </Button>
        </Form>
      </Col>
      <Col lg={8}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Progresser />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr className="table-info">
                <th>Order ID</th>
                <th>Purchased DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="table-light">
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <i
                        className="fa-solid fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i
                        className="fa-solid fa-xmark"
                        style={{ color: "red" }}
                      ></i>
                    )}
                  </td>
                  <td>
                    {order.isDispatched ? (
                      order.dispatchedAt.substring(0, 10)
                    ) : (
                      <i
                        className="fa-solid fa-xmark"
                        style={{ color: "red" }}
                      ></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button
                        variant="light"
                        className="btn btn-outline-primary btn-sm"
                      >
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
