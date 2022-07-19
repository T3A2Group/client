import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import Rating from "../../components/Rating";
// import products from "../products"; //same as in HomeScreen component.,use axios to fetch data
import { useParams, useNavigate } from "react-router-dom";
// import redux stuffs for each villa component
import { useDispatch, useSelector } from "react-redux";
import { listFoodDetails } from "../../actions/productActions/foodActions";
import Loader from "../../components/Loading/Loader";
import Message from "../../components/Loading/Message";

const FoodScreen = () => {
  const { id } = useParams();
  const [foodQty, setFoodQty] = useState(1); ////set food qty state, this is component state
  const navigateTo = useNavigate(); //for cart qty url

  const dispatch = useDispatch();
  const foodDetails = useSelector((state) => state.foodDetails);
  const { loading, error, food } = foodDetails;

  useEffect(() => {
    dispatch(listFoodDetails(id));
  }, [dispatch, id]);

  // event handler: for add to cart
  const addToCartHandler = () => {
    navigateTo(`/cart/${id}?category=food&qty=${foodQty}`);
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
              <Image src={food.image} alt={food.name} fluid />
            </Col>
            <Col lg={3} className="mt-3">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{food.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={parseInt(food.rating)}
                    text={`${food.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price : ${food.price}</ListGroup.Item>
                <ListGroup.Item className="text-success">
                  Type : {food.type}
                </ListGroup.Item>
                <ListGroup.Item className="text-success">
                  Category : {food.category}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description : ${food.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col lg={3} className="mt-3">
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${food.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col
                        style={{
                          color: `${food.countInStock > 0 ? "green" : "red"}`,
                        }}
                      >
                        {food.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* use ternary operator to daminamicly show food qty status: 0< food.qty <=4 */}
                  {food.countInStock > 0 && food.countInStock <= 4 && (
                    <ListGroup.Item>
                      <Row>
                        <Col className="text-danger">
                          <strong>
                            Hurry up! Only {food.countInStock} Available!
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  {food.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Food Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={foodQty}
                            onChange={(e) => setFoodQty(e.target.value)}
                          >
                            {[...Array(food.countInStock).keys()].map((f) => (
                              <option key={f + 1} value={f + 1}>
                                {f + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={food.countInStock === 0}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
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

export default FoodScreen;
