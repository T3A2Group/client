import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../../components/Rating";
// import products from "../products"; //same as in HomeScreen component.,use axios to fetch data
import { useParams } from "react-router-dom";
import axios from "axios";

const SpecialtyScreen = () => {
  const { id } = useParams();
  //   console.log(id);
  //   const product = products.find((p) => p._id === id);
  //   console.log(product);

  const [specialty, setSpecialty] = useState({});
  //   console.log(food);
  useEffect(() => {
    const fetchSpecialty = async () => {
      const res = await axios.get(`/api/specialties/${id}`);
      setSpecialty(res.data);
    };
    fetchSpecialty();
  }, [id]);

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={specialty.image} alt={specialty.name} fluid />
        </Col>
        <Col md={3}>
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
              Description : ${specialty.description}
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
                    <strong>${specialty.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col
                    style={{
                      color: `${specialty.countInStock > 0 ? "green" : "red"}`,
                    }}
                  >
                    {specialty.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={specialty.countInStock === 0}
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

export default SpecialtyScreen;
