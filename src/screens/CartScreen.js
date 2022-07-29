import React, { useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Loading/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = () => {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const location = useLocation();
  const category = location.search
    ? location.search.split("=")[1].split("&")[0]
    : null; //if url has category, then grab the category, else, we set to null,cause users might don't add anything to the cart and want to explore cart page
  const qty = location.search ? Number(location.search.split("=")[2]) : 1; //=> eg: if we add 1 villa product to cart, then url is ?category=villa&qty=1, in this case, we only need to get the qty
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(category, id, qty));
    }
  }, [dispatch, category, id, qty]);

  //remover cart item function
  const removeFromCartHandler = (id) => {
    // console.log("remove");
    dispatch(removeFromCart(id));
    navigateTo("/cart");
  };

  //total cart items qty and price
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  //checkout hander
  const checkoutHander = () => {
    navigateTo("/login?redirect=/shipping");
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Welcome to Tas Resort | Cart</title>
      </Helmet>
      <Row className="mt-3">
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your Cart is empty{" "}
              <Link style={{ textDecoration: "none" }} to="/">
                Go back
              </Link>
            </Message>
          ) : (
            <ListGroup
              variant="flush"
              className="mt-3"
              style={{ border: "none" }}
            >
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product} className="mb-3">
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/${item.category}/${item.product}`}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(
                              item.category,
                              item.product,
                              Number(e.target.value)
                            )
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Subtotal ({totalQty}) items</h2>${totalPrice}
              </ListGroup.Item>
              <ListGroup.Item className="d-grid gap-2">
                <Button
                  type="button"
                  className="lg"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHander}
                >
                  Check Out
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </HelmetProvider>
  );
};

export default CartScreen;
