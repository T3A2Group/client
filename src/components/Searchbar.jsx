import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

const Searchbar = ({ searchbar, closeSearchbar, category, className }) => {
  //add search state and functions,category will allow us to filter different products in different categories page
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${category}/${keyword}`);
    } else {
      navigate(`/${category}`);
    }
  };

  return (
    <div className={searchbar ? "searchbar searchbar--open" : "searchbar"}>
      <div className="backdrop" onClick={closeSearchbar}></div>
      <div className="searchbar--main">
        <Form onSubmit={submitHandler}>
          <Row className="align-items-center justify-content-around">
            <Col xs="auto">
              <i className={className} />
            </Col>
            <Col xs="auto">
              <Form.Control
                size="sm"
                id="inlineFormInputGroup"
                placeholder="Please Type Keyword..."
                className="m-1 rounded-pill py-1"
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </Col>

            {/* <Col xs="auto">
              <Form.Select size="sm" className="rounded-pill m-1">
                <option>Villa</option>
                <option>Food</option>
                <option>Specialty</option>
                <option>Travel</option>
              </Form.Select>
            </Col> */}

            <Col xs="auto">
              <Button
                type="submit"
                size="sm"
                variant="outline-info"
                className="rounded-pill m-1"
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Searchbar;
