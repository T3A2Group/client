import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
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
