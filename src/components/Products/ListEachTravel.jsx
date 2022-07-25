import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import Rating from "../Rating";
import { Link } from "react-router-dom";

const ListEachTravel = ({ travel }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Row>
        <Col lg={4} className="row align-items-center">
          <Link to={`/travel/${travel._id}`}>
            <Card.Img src={travel.image} />
          </Link>
        </Col>
        <Col lg={6}>
          <Card.Body>
            <Link to={`/travel/${travel._id}`}>
              <Card.Title as="h1" className="lead">
                <strong>{travel.name}</strong>
              </Card.Title>
            </Link>

            <Card.Text>Description: {travel.description}</Card.Text>

            <Card.Text as="div">
              <Rating
                className="my-3 lead"
                value={parseInt(travel.rating)}
                text={`${travel.numReviews} reviews`}
              />
            </Card.Text>

            <Card.Text as="h3">${travel.price}</Card.Text>
          </Card.Body>
        </Col>
        <Col lg={2} className="row align-items-end">
          <Link className="btn btn-dark btn-block" to={`/travel/${travel._id}`}>
            More Details
          </Link>
        </Col>
      </Row>
    </Card>
  );
};

export default ListEachTravel;
