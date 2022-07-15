import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../../components/Rating";
// import products from "../products"; //same as in HomeScreen component.,use axios to fetch data
import { useParams } from "react-router-dom";
import axios from "axios";

const VillaScreen = () => {
  const { id } = useParams();
  //   console.log(id);
  //   const product = products.find((p) => p._id === id);
  //   console.log(product);

  const [villa, setVilla] = useState({});
  useEffect(() => {
    const fetchVilla = async () => {
      const res = await axios.get(`/api/villas/${id}`);
      setVilla(res.data);
    };
    fetchVilla();
  }, [id]);

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={villa.image} alt={villa.name} fluid />
        </Col>
        <Col md={3}>
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
            <ListGroup.Item>Description : ${villa.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
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
    </>
  );
};

export default VillaScreen;
