import React, { useState, useEffect } from "react";
import Product from "../components/Product";
// import products from "../products";  //fetch it from backend
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("/api/products"); // at this stage, need to add proxy in package.json
      // console.log(res);
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Container className="my-3">
        <h1>Products One</h1>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="my-3">
        <h1>Products Two</h1>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="my-3">
        <h1>Products Three</h1>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="my-3">
        <h1>Products Four</h1>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomeScreen;
