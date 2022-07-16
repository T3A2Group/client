import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
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
  const dispatch = useDispatch();
  const travelDetails = useSelector((state) => state.travelDetails);
  const { loading, error, travel } = travelDetails;

  useEffect(() => {
    dispatch(listTravelDetails(id));
  }, [dispatch, id]);

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
        <Row>
          <Col md={6}>
            <Image src={travel.image} alt={travel.name} fluid />
          </Col>
          <Col md={3}>
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
          <Col md={3}>
            <Card>
              <ListGroup variant="flush" className="border-light">
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

                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={travel.countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default TravelScreen;
