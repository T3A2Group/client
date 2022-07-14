import React from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>Welcome to Tasmania</h1>
      <hr />
      
        <Card style={{ width: '100%' }}>
          <Card.Body>
            <Link to={`/products/`}>
              <Card.Title>Booking Villa</Card.Title>
            </Link>
          </Card.Body>
        </Card>
        <hr />
        <Card style={{ width: '100%' }}>
          <Card.Body>
            <Link to={`/products/`}>
              <Card.Title>Dinning Food</Card.Title>
            </Link>
          </Card.Body>
        </Card>
        <hr />
        <Card style={{ width: '100%' }}>
          <Card.Body>
            <Link to={`/products/`}>
              <Card.Title>Travel Tour</Card.Title>
            </Link>
          </Card.Body>
        </Card>
        <hr />
        <Card style={{ width: '100%' }}>
          <Card.Body>
            <Link to={`/products/`}>
              <Card.Title>Souvenirs</Card.Title>
            </Link>
          </Card.Body>
        </Card>
        <hr />
    </>
  )
}

export default Home