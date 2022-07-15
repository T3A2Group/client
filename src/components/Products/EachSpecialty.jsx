import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../Rating";
import { Link } from "react-router-dom";

const EachSpecialty = ({ specialty }) => {
  return (
    <Card className="my-3 p-3 rounded border-light">
      <Link to={`/specialties/${specialty._id}`}>
        <Card.Img
          src={specialty.image}
          variant="top"
          width="286px"
          height="180px"
        />
      </Link>
      <Card.Body>
        <Link to={`/specialties/${specialty._id}`}>
          <Card.Title as="div" className="lead">
            <strong>{specialty.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            className="my-3 lead"
            value={parseInt(specialty.rating)}
            text={`${specialty.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">${specialty.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default EachSpecialty;
