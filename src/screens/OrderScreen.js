import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Loading/Message";
import Progresser from "../components/Loading/Progresser";
import Loader from "../components/Loading/Loader";
import {
  getOrderDetails,
  payOrder,
  dispatchOrder,
} from "../actions/orderActions";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  ORDER_PAY_RESET,
  ORDER_DISPATCH_RESET,
} from "../constants/orderConstants";

const OrderScreen = () => {
  const nagivateTo = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const orderId = id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  //grab order pay state to check payment status,have to rename loading and success cause above has same name.
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  //For admin order dispatch
  const orderDispatch = useSelector((state) => state.orderDispatch);
  const { loading: loadingDispatch, success: successDispatch } = orderDispatch;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    //for order items gross price start:
    const addDecimals = (num) => {
      return Number((Math.round(num * 100) / 100).toFixed(2));
    };
    order.itemsPrice = addDecimals(
      Number(
        order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      )
    );
    //for order items gross price end.
  }

  //for paypal payment config:
  const [{ isPending, isResolved, isRejected }] = usePayPalScriptReducer();

  useEffect(() => {
    if (!userInfo) {
      nagivateTo("/login");
    }
    // update order screen data if user switch between orders.
    if (!order || order._id !== orderId || successPay || successDispatch) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DISPATCH_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [
    dispatch,
    order,
    orderId,
    successPay,
    successDispatch,
    nagivateTo,
    userInfo,
  ]);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: { value: order.totalPrice },
        },
      ],
    });
  };

  const successPaymentHandler = (data, actions) => {
    return actions.order.capture().then((details) => {
      dispatch(payOrder(orderId, details));
    });
  };

  const dispatchHandler = () => {
    dispatch(dispatchOrder(order));
  };

  return loading ? (
    <Progresser />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h2>Order ID: {orderId}</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            {/* shipping */}
            <ListGroup.Item>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong> {order.user.email}
              </p>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city},{order.shippingAddress.postCode},{" "}
                {order.shippingAddress.country},
              </p>
              {order.isDispatched ? (
                <Message variant="success">
                  Dispatch On {order.dispatchedAt}
                </Message>
              ) : (
                <Message variant="info">Waiting For Dispatch...</Message>
              )}
            </ListGroup.Item>
            {/* payment */}
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid On {order.paidAt}</Message>
              ) : (
                <Message variant="warning">Not Paid Yet</Message>
              )}
            </ListGroup.Item>
            {/* show order items */}
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((orderItem, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col lg={1}>
                          <Image
                            src={orderItem.image}
                            alt={orderItem.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          {/* <Link to={`/${orderItem.category}/${orderItem.product}`}>
                            {item.name}
                          </Link> */}
                          {orderItem.name}
                        </Col>
                        <Col lg={4}>
                          {orderItem.qty} x ${orderItem.price} = $
                          {orderItem.qty * orderItem.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>
                    ${order.shippingPrice}
                    {order.shippingPrice ? null : <p>No Delivery Required</p>}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>GST</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="text-primary">
                <Row>
                  <Col>
                    <strong>Total</strong>
                  </Col>
                  <Col>
                    <strong>${order.totalPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending && <Loader />}
                  {isRejected && (
                    <Message variant="danger">SDK load error</Message>
                  )}
                  {isResolved && (
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDispatch && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDispatched && (
                  <ListGroup.Item className="d-grid gap-2">
                    <Button
                      type="button"
                      className="btn btn-outline-warning lg"
                      onClick={dispatchHandler}
                    >
                      Mark as Dispatch
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
