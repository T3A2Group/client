import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import Rating from "../Rating";
import { Link } from "react-router-dom";

const ListEachVilla = ({ villa }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Row>
        <Col lg={4} className="row align-items-center">
          <Link to={`/villa/${villa._id}`}>
            <Card.Img src={villa.image} />
          </Link>
        </Col>
        <Col lg={6}>
          <Card.Body>
            <Link to={`/villa/${villa._id}`}>
              <Card.Title as="h1" className="lead">
                <strong>{villa.name}</strong>
              </Card.Title>
            </Link>

            <Card.Text>Description: {villa.description}</Card.Text>

            <Card.Text as="div">
              <Rating
                className="my-3 lead"
                value={parseInt(villa.rating)}
                text={`${villa.numReviews} reviews`}
              />
            </Card.Text>

            <Card.Text as="h3">${villa.price}</Card.Text>
          </Card.Body>
        </Col>
        <Col lg={2} className="row align-items-end">
          <Link className="btn btn-dark btn-block" to={`/villa/${villa._id}`}>
            More Details
          </Link>
        </Col>
      </Row>
    </Card>
  );
};

export default ListEachVilla;
