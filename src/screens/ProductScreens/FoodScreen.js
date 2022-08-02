import React, { useState, useEffect } from "react";
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
import { useParams, useNavigate, Link } from "react-router-dom";
// import redux stuffs for each Food component
import { useDispatch, useSelector } from "react-redux";
import {
  listFoodDetails,
  createFoodReview,
} from "../../actions/productActions/foodActions";
import { FOOD_CREATE_REVIEW_RESET } from "../../constants/productsConstant/foodConstants";
import Loader from "../../components/Loading/Loader";
import Message from "../../components/Loading/Message";

const FoodScreen = () => {
  const { id } = useParams();
  const [foodQty, setFoodQty] = useState(1); ////set food qty state, this is component state
  const navigateTo = useNavigate(); //for cart qty url
  const dispatch = useDispatch();

  //for food product comments state:
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const foodDetails = useSelector((state) => state.foodDetails);
  const { loading, error, food } = foodDetails;

  const foodReviewCreate = useSelector((state) => state.foodReviewCreate);
  const { success: successFoodReview, error: errorFoodReview } =
    foodReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successFoodReview) {
      setRating(0);
      setComment("");
      dispatch({ type: FOOD_CREATE_REVIEW_RESET });
    }

    dispatch(listFoodDetails(id));
  }, [dispatch, id, successFoodReview]);

  // event handler: for add to cart
  const addToCartHandler = () => {
    navigateTo(`/cart/${id}?category=food&qty=${foodQty}`);
  };

  // review form sumbit handler:
  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createFoodReview(id, {
        rating,
        comment,
      })
    );
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
                  Description : {food.description}
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

                  <ListGroup.Item className="d-grid gap-2">
                    <Button
                      className="lg"
                      type="button"
                      disabled={food.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="my-2">
            <Col lg={6}>
              <h2>Reviews</h2>
              {food.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup>
                {food.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={parseInt(review.rating)} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                {!food.reviews.some((rev) => rev.user === userInfo?._id) && (
                  <ListGroup.Item>
                    <h5>Write a Customer Reivew</h5>
                    {errorFoodReview && (
                      <Message variant="danger">{errorFoodReview}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={reviewSubmitHandler}>
                        <Form.Group controlId="rating" className="my-3">
                          <Form.Label className="text-primary">
                            Rating
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Select Rate</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Yummy</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group
                          controlId="comment"
                          className="text-primary"
                        >
                          <Form.Label>Comments</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button type="submit" className="my-2">
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to="/login">Sign in</Link> to write a
                        review
                      </Message>
                    )}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default FoodScreen;
