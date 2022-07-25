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
import { listSpecialtyDetails } from "../../actions/productActions/specialtyActions";
import Loader from "../../components/Loading/Loader";
import Message from "../../components/Loading/Message";

const SpecialtyScreen = () => {
  const { id } = useParams();
  const [specialtyQty, setSpecialtyQty] = useState(1); ////set food qty state, this is component state
  const navigateTo = useNavigate(); //for cart qty url

  const dispatch = useDispatch();
  const specialtyDetails = useSelector((state) => state.specialtyDetails);
  const { loading, error, specialty } = specialtyDetails;

  useEffect(() => {
    dispatch(listSpecialtyDetails(id));
  }, [dispatch, id]);

  // event handler: for add to cart
  const addToCartHandler = () => {
    navigateTo(`/cart/${id}?category=specialty&qty=${specialtyQty}`);
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
              <Image src={specialty.image} alt={specialty.name} fluid />
            </Col>
            <Col lg={3} className="mt-3">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{specialty.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={parseInt(specialty.rating)}
                    text={`${specialty.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price : ${specialty.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description : ${specialty.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col lg={3} className="mt-3">
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item className="text-success">
                    Type : {specialty.type}
                  </ListGroup.Item>
                  <ListGroup.Item className="text-success">
                    Category : {specialty.category}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${specialty.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col
                        style={{
                          color: `${
                            specialty.countInStock > 0 ? "green" : "red"
                          }`,
                        }}
                      >
                        {specialty.countInStock > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* use ternary operator to daminamicly show specialty qty status: 0< specialty.qty <=10 */}
                  {specialty.countInStock > 0 && specialty.countInStock <= 10 && (
                    <ListGroup.Item>
                      <Row>
                        <Col className="text-danger">
                          <strong>
                            Hurry up! Only {specialty.countInStock} Available!
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  {specialty.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Choose Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={specialtyQty}
                            onChange={(e) => setSpecialtyQty(e.target.value)}
                          >
                            {[...Array(specialty.countInStock).keys()].map(
                              (s) => (
                                <option key={s + 1} value={s + 1}>
                                  {s + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item className="d-grid gap-2">
                    <Button
                      className="lg"
                      type="button"
                      disabled={specialty.countInStock === 0}
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

export default SpecialtyScreen;
