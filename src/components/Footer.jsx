import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        marginTop: "1rem",
        padding: "0.2rem",
        color: "white",
        backgroundColor: "rgb(52, 58, 64)",
        /* position: fixed; */
        bottom: "0",
        left: "0",
        width: "100%",
      }}
    >
      <Container>
        <Row>
          <Col className="text-center py-3">
            Copyright &copy; Tasmania Resort
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
