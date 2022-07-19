import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Container,
} from "react-bootstrap";
import "./productScreen.css";
import Rating from "../../components/Rating";
// import products from "../products"; //same as in HomeScreen component.,use axios to fetch data
import { useParams } from "react-router-dom";
// import axios from "axios";
// import redux stuffs for each villa component
import { useDispatch, useSelector } from "react-redux";
import { listVillaDetails } from "../../actions/productActions/villaActions";
import Loader from "../../components/Loading/Loader";
import Message from "../../components/Loading/Message";

const VillaScreen = () => {
  const { id } = useParams();
  const [villaQty, setVillaQty] = useState(1); //set villa qty state, this is component state
  const navigateTo = useNavigate(); //for cart qty url

  const dispatch = useDispatch();
  const villaDetails = useSelector((state) => state.villaDetails);
  const { loading, error, villa } = villaDetails;

  useEffect(() => {
    dispatch(listVillaDetails(id));
  }, [dispatch, id]);

  // event handler: for add to cart
  const addToCartHandler = () => {
    navigateTo(`/cart/${id}?category=villa&qty=${villaQty}`);
  };

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message />
      ) : (
        <Container>
          <Row>
            <Col lg={6}>
              <Image src={villa.image} alt={villa.name} fluid />
            </Col>
            <Col lg={3} className="mt-3">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{villa.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={parseInt(villa.rating)}
                    text={`${villa.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price : ${villa.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description : ${villa.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col lg={3} className="mt-3">
              <Card>
                <ListGroup variant="flush" className="list-group">
                  <ListGroup.Item className="text-success">
                    Category: {villa.category}
                  </ListGroup.Item>
                  <ListGroup.Item className="text-success">
                    Type: {villa.type}
                  </ListGroup.Item>
                  <ListGroup.Item className="text-success">
                    Maxpople: {villa.maxPeople}
                  </ListGroup.Item>
                  <ListGroup.Item className="text-success">
                    roomNums: {villa.roomNums}
                  </ListGroup.Item>
                </ListGroup>
              </Card>

              <Card className="mt-3">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${villa.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col
                        style={{
                          color: `${villa.countInStock > 0 ? "green" : "red"}`,
                        }}
                      >
                        {villa.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* use ternary operator to daminamicly show villas qty status: 0< villa.qty <=3 */}
                  {villa.countInStock > 0 && villa.countInStock <= 3 && (
                    <ListGroup.Item>
                      <Row>
                        <Col className="text-danger ">
                          <strong>
                            Hurry up! Only {villa.countInStock} Left
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  {villa.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col className="text-danger ">Villa Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={villaQty}
                            onChange={(e) => setVillaQty(e.target.value)}
                          >
                            {[...Array(villa.countInStock).keys()].map((v) => (
                              <option key={v + 1} value={v + 1}>
                                {v + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item className="d-grid gap-2">
                    <Button
                      className="lg"
                      type="button"
                      disabled={villa.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default VillaScreen;
