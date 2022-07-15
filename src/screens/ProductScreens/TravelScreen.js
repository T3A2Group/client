import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../../components/Rating";
// import products from "../products"; //same as in HomeScreen component.,use axios to fetch data
import { useParams } from "react-router-dom";
import axios from "axios";

const TravelScreen = () => {
  const { id } = useParams();
  //   console.log(id);
  //   const product = products.find((p) => p._id === id);
  //   console.log(product);

  const [travel, setTravel] = useState({});
  //   console.log(food);
  useEffect(() => {
    const fetchTravel = async () => {
      const res = await axios.get(`/api/travel/${id}`);
      setTravel(res.data);
    };
    fetchTravel();
  }, [id]);

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
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
            <ListGroup.Item>Description : ${travel.description}</ListGroup.Item>
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
    </>
  );
};

export default TravelScreen;
