import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../Rating";
import { Link } from "react-router-dom";

const EachTravel = ({ travel }) => {
  return (
    <Card className="my-3 p-3 rounded border-light">
      <Link to={`/travel/${travel._id}`}>
        <Card.Img
          src={travel.image}
          variant="top"
          width="286px"
          height="180px"
        />
      </Link>
      <Card.Body>
        <Link to={`/travel/${travel._id}`}>
          <Card.Title as="div" className="lead">
            <strong>{travel.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            className="my-3 lead"
            value={parseInt(travel.rating)}
            text={`${travel.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">${travel.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default EachTravel;
