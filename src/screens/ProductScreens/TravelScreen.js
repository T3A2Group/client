import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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
// import redux stuffs for each travel plan component
import { useDispatch, useSelector } from "react-redux";
import {
  listTravelDetails,
  createTravelReview,
} from "../../actions/productActions/travelActions";
import { TRAVEL_CREATE_REVIEW_RESET } from "../../constants/productsConstant/travelConstants";
import Loader from "../../components/Loading/Loader";
import Message from "../../components/Loading/Message";

const TravelScreen = () => {
  const { id } = useParams();
  const [travelQty, setTravelQty] = useState(1);
  const navigateTo = useNavigate(); //for cart qty url
  const dispatch = useDispatch();

  //for travel product comments state:
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const travelDetails = useSelector((state) => state.travelDetails);
  const { loading, error, travel } = travelDetails;

  const travelReviewCreate = useSelector((state) => state.travelReviewCreate);
  const { success: successTravelReview, error: errorTravelReview } =
    travelReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successTravelReview) {
      setRating(0);
      setComment("");
      dispatch({ type: TRAVEL_CREATE_REVIEW_RESET });
    }
    dispatch(listTravelDetails(id));
  }, [dispatch, id, successTravelReview]);

  // event handler: for add to cart
  const addToCartHandler = () => {
    navigateTo(`/cart/${id}?category=travel&qty=${travelQty}`);
  };

  // review form sumbit handler:
  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createTravelReview(id, {
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
                  Description : {travel.description}
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
                  {/* {travel.attractions &&
                    travel.attractions.map((attraction, index) => (
                      <ListGroup.Item className="text-success" key={index}>
                        {`Day ${index + 1}`}: {attraction.name}
                        {attraction.briefInfo}
                      </ListGroup.Item>
                    ))} */}
                  {travel.attractions && (
                    <div>
                      <ListGroup.Item className="text-success">
                        {travel.attractions.name}
                      </ListGroup.Item>
                      <ListGroup.Item className="text-success">
                        {travel.attractions.briefInfo}
                      </ListGroup.Item>
                    </div>
                  )}
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
          <Row className="my-2">
            <Col lg={6}>
              <h2>Reviews</h2>
              {travel.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup>
                {travel.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={parseInt(review.rating)} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                {!travel.reviews.some((rev) => rev.user === userInfo?._id) && (
                  <ListGroup.Item>
                    <h5>Write a Customer Reivew</h5>
                    {errorTravelReview && (
                      <Message variant="danger">{errorTravelReview}</Message>
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
                            <option value="4">4 - Very Good</option>
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

export default TravelScreen;
