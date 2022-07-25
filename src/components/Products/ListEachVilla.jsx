import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Rating from "../Rating";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

const ListEachVilla = ({ villa }) => {
  return (
    <Card className="my-3 p-3 rounded">
        <Row>
            <Col lg={4}>
                <Link to={`/villa/${villa._id}`}>
                    <Card.Img
                    src={villa.image}
                    />
                </Link>
            </Col>
            <Col lg={6}>
                <Card.Body >

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
            <Col lg={2} className='row align-items-end'>
                <LinkContainer to={`/villa/${villa._id}`} >
                    <Button type='button' variant='dark' className="btn-block">
                        More Details
                    </Button>
                </LinkContainer>
            </Col>
        </Row>
    </Card>
  );
};

export default ListEachVilla;
