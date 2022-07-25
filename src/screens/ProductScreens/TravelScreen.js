import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Container,
  Form,
} from "react-bootstrap";
import Rating from "../../components/Rating";
// import products from "../products"; //same as in HomeScreen component.,use axios to fetch data
import { useParams } from "react-router-dom";
// import redux stuffs for each villa component
import { useDispatch, useSelector } from "react-redux";
import { listTravelDetails } from "../../actions/productActions/travelActions";
import Loader from "../../components/Loading/Loader";
import Message from "../../components/Loading/Message";

const TravelScreen = () => {
  const { id } = useParams();
  const [travelQty, setTravelQty] = useState(1);
  const navigateTo = useNavigate(); //for cart qty url

  const dispatch = useDispatch();
  const travelDetails = useSelector((state) => state.travelDetails);
  const { loading, error, travel } = travelDetails;

  useEffect(() => {
    dispatch(listTravelDetails(id));
  }, [dispatch, id]);

  // event handler: for add to cart
  const addToCartHandler = () => {
    navigateTo(`/cart/${id}?category=travel&qty=${travelQty}`);
  };

  return (
    <>
      <Button className="btn btn-dark my-3" onClick={() => navigateTo(-1)}>
        Go Back
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message />
      ) : (
        <Container>
          <Row>
            <Col lg={6}>
              <Image src={travel.image} alt={travel.name} fluid />
            </Col>
            <Col lg={6} className="mt-3">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{travel.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={parseInt(travel.rating)}
                    text={`${travel.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price : ${travel.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description : ${travel.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          <Row>
            <Col lg={6} className="mt-3">
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item className="text-success">
                    Attractions:
                  </ListGroup.Item>
                  {travel.attractions &&
                    travel.attractions.map((attraction, index) => (
                      <ListGroup.Item className="text-success" key={index}>
                        {`Day ${index + 1}`}: {attraction.name}
                        {attraction.briefInfo}
                      </ListGroup.Item>
                    ))}
                  <ListGroup.Item className="text-success">
                    Duration: {travel.duration}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>

            <Col lg={6} className=" mt-3">
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item className="text-success">
                    Type : {travel.type}
                  </ListGroup.Item>
                  <ListGroup.Item className="text-success">
                    Category : {travel.category}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${travel.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col
                        style={{
                          color: `${travel.countInStock > 0 ? "green" : "red"}`,
                        }}
                      >
                        {travel.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* use ternary operator to daminamicly show travel plan qty status: 0< travel.qty <=10 */}
                  {travel.countInStock > 0 && travel.countInStock <= 8 && (
                    <ListGroup.Item>
                      <Row>
                        <Col className="text-danger">
                          <strong>
                            Hurry up! Only {travel.countInStock} Left!
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  {travel.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>How Many People</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={travelQty}
                            onChange={(e) => setTravelQty(e.target.value)}
                          >
                            {[...Array(travel.countInStock).keys()].map((t) => (
                              <option key={t + 1} value={t + 1}>
                                {t + 1}
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
                      disabled={travel.countInStock === 0}
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

export default TravelScreen;
