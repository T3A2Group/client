import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../Rating";
import { Link } from "react-router-dom";

const EachFood = ({ food }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/food/${food._id}`}>
        <Card.Img src={food.image} variant="top" width="286px" height="180px" />
      </Link>
      <Card.Body>
        <Link to={`/food/${food._id}`}>
          <Card.Title as="div" className="lead">
            <strong>{food.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            className="my-3 lead"
            value={parseInt(food.rating)}
            text={`${food.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">${food.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default EachFood;
