import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
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
  const dispatch = useDispatch();
  const villaDetails = useSelector((state) => state.villaDetails);
  const { loading, error, villa } = villaDetails;

  useEffect(() => {
    dispatch(listVillaDetails(id));
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
            <Image src={villa.image} alt={villa.name} fluid />
          </Col>
          <Col md={3} className="mt-md-0 mt-3">
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
          <Col md={3} className="mt-md-0 mt-3">
            <Card>
              <ListGroup variant="flush" className="border-light">
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
              <ListGroup variant="flush" className="border-light">
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

                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={villa.countInStock === 0}
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

export default VillaScreen;
