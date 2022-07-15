import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../Rating";
import { Link } from "react-router-dom";

const EachVilla = ({ villa }) => {
  return (
    <Card className="my-3 p-3 rounded border-light">
      <Link to={`/villas/${villa._id}`}>
        <Card.Img
          src={villa.image}
          variant="top"
          width="286px"
          height="180px"
        />
      </Link>
      <Card.Body>
        <Link to={`/villas/${villa._id}`}>
          <Card.Title as="div" className="lead">
            <strong>{villa.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            className="my-3 lead"
            value={parseInt(villa.rating)}
            text={`${villa.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">${villa.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default EachVilla;
