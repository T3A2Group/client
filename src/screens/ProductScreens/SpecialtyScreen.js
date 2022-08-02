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
// import redux stuffs for each specialty component
import { useDispatch, useSelector } from "react-redux";
import {
  listSpecialtyDetails,
  createSpecialtyReview,
} from "../../actions/productActions/specialtyActions";
import { SPECIALTY_CREATE_REVIEW_RESET } from "../../constants/productsConstant/specialtyConstants";
import Loader from "../../components/Loading/Loader";
import Message from "../../components/Loading/Message";

const SpecialtyScreen = () => {
  const { id } = useParams();
  const [specialtyQty, setSpecialtyQty] = useState(1); ////set food qty state, this is component state
  const navigateTo = useNavigate(); //for cart qty url
  const dispatch = useDispatch();

  //for specialty product comments state:
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const specialtyDetails = useSelector((state) => state.specialtyDetails);
  const { loading, error, specialty } = specialtyDetails;

  const specialtyReviewCreate = useSelector(
    (state) => state.specialtyReviewCreate
  );
  const { success: successSpecialtyReview, error: errorSpecialtyReview } =
    specialtyReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successSpecialtyReview) {
      setRating(0);
      setComment("");
      dispatch({ type: SPECIALTY_CREATE_REVIEW_RESET });
    }

    dispatch(listSpecialtyDetails(id));
  }, [dispatch, id, successSpecialtyReview]);

  // event handler: for add to cart
  const addToCartHandler = () => {
    navigateTo(`/cart/${id}?category=specialty&qty=${specialtyQty}`);
  };

  // review form sumbit handler:
  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createSpecialtyReview(id, {
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
                  Description : {specialty.description}
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
          <Row className="my-2">
            <Col lg={6}>
              <h2>Reviews</h2>
              {specialty.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup>
                {specialty.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={parseInt(review.rating)} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                {!specialty.reviews.some(
                  (rev) => rev.user === userInfo?._id
                ) && (
                  <ListGroup.Item>
                    <h5>Write a Customer Reivew</h5>
                    {errorSpecialtyReview && (
                      <Message variant="danger">{errorSpecialtyReview}</Message>
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

export default SpecialtyScreen;
