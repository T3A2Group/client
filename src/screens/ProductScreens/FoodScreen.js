import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../../components/Rating";
// import products from "../products"; //same as in HomeScreen component.,use axios to fetch data
import { useParams } from "react-router-dom";
import axios from "axios";

const FoodScreen = () => {
  const { id } = useParams();
  //   console.log(id);
  //   const product = products.find((p) => p._id === id);
  //   console.log(product);

  const [food, setFood] = useState({});
  //   console.log(food);
  useEffect(() => {
    const fetchFood = async () => {
      const res = await axios.get(`/api/food/${id}`);
      setFood(res.data);
    };
    fetchFood();
  }, [id]);

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={food.image} alt={food.name} fluid />
        </Col>
        <Col md={3}>
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
            <ListGroup.Item>Description : ${food.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush" className="border-light">
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

              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={food.countInStock === 0}
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

export default FoodScreen;
