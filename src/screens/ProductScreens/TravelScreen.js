import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Container,
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
        <Container>
          <Row>
            <Col md={6}>
              <Image src={travel.image} alt={travel.name} fluid />
            </Col>
            <Col md={6} className="mt-md-0 mt-3">
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
            <Col md={6} className="mt-3">
              <Card>
                <ListGroup variant="flush" className="border-light">
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

            <Col md={6} className=" mt-3">
              <Card>
                <ListGroup variant="flush" className="border-light">
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
        </Container>
      )}
    </>
  );
};

export default TravelScreen;
