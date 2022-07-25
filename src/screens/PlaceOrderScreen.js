import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Loading/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const nagivateTo = useNavigate();

  //mimic real business, calculate prices:start
  const addDecimals = (num) => {
    return Number((Math.round(num * 100) / 100).toFixed(2));
  };
  const orderCart = {};
  //=> gross total order items price
  orderCart.itemsPrice = addDecimals(
    Number(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
  );
  //=> shipping price
  //if order including specialties, then need shipping, otherwise no shipping require.
  orderCart.category = cart.cartItems.map((item) => item.category);
  orderCart.shippingPrice = addDecimals(
    Number(orderCart.category.includes("specialty") ? 10 : 0)
  );
  //=> tax price 10% GST
  orderCart.taxPrice = addDecimals(
    Number((0.1 * orderCart.itemsPrice).toFixed(2))
  );
  //=>total order price
  orderCart.totalPrice = addDecimals(
    Number(orderCart.itemsPrice + orderCart.shippingPrice + orderCart.taxPrice)
  );
  //calculate prices:end

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      nagivateTo(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [nagivateTo, success]);
  //dispatch cart and orderCart properties into createOrder action:
  //   console.log(cart);
  //   console.log(orderCart);
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: orderCart.itemsPrice,
        shippingPrice: orderCart.shippingPrice,
        taxPrice: orderCart.taxPrice,
        totalPrice: orderCart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            {/* shipping */}
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city},{cart.shippingAddress.postCode},{" "}
                {cart.shippingAddress.country},
              </p>
            </ListGroup.Item>
            {/* payment */}
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method:</strong> {cart.paymentMethod}
            </ListGroup.Item>
            {/* show order items */}
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col lg={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/${item.category}/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col lg={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
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
                  <Col>${orderCart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>
                    ${orderCart.shippingPrice}
                    {orderCart.shippingPrice ? null : (
                      <p>No Delivery Required</p>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>GST</Col>
                  <Col>${orderCart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="text-primary">
                <Row>
                  <Col>
                    <strong>Total</strong>
                  </Col>
                  <Col>
                    <strong>${orderCart.totalPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item className="d-grid gap-2">
                <Button
                  type="button"
                  className="btn btn-outline-success lg"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
