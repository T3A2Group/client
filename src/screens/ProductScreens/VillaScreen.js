import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
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
// import redux stuffs for each villa component
import { useDispatch, useSelector } from "react-redux";
import {
  listVillaDetails,
  createVillaReview,
} from "../../actions/productActions/villaActions";
import { VILLA_CREATE_REVIEW_RESET } from "../../constants/productsConstant/villaConstants";
import Loader from "../../components/Loading/Loader";
import Message from "../../components/Loading/Message";

const VillaScreen = () => {
  const { id } = useParams();
  const [villaQty, setVillaQty] = useState(1); //set villa qty state, this is component state

  //for villa product comments state:
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const navigateTo = useNavigate(); //for cart qty url
  const dispatch = useDispatch();

  const villaDetails = useSelector((state) => state.villaDetails);
  const { loading, error, villa } = villaDetails;

  const villaReviewCreate = useSelector((state) => state.villaReviewCreate);
  const { success: successVillaReview, error: errorVillaReview } =
    villaReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successVillaReview) {
      setRating(0);
      setComment("");
      dispatch({ type: VILLA_CREATE_REVIEW_RESET });
    }

    dispatch(listVillaDetails(id));
  }, [dispatch, id, successVillaReview]);

  // event handler: for add to cart
  const addToCartHandler = () => {
    navigateTo(`/cart/${id}?category=villa&qty=${villaQty}`);
  };

  // review form sumbit handler:
  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createVillaReview(id, {
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
                  Description : {villa.description}
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
          <Row className="my-2">
            <Col lg={6}>
              <h2>Reviews</h2>
              {villa.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup>
                {villa.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={parseInt(review.rating)} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                {!villa.reviews.some((rev) => rev.user === userInfo?._id) && (
                  <ListGroup.Item>
                    <h5>Write a Customer Reivew</h5>
                    {errorVillaReview && (
                      <Message variant="danger">{errorVillaReview}</Message>
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

export default VillaScreen;
