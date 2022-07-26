import React from 'react'
import { Form, Button, Row, Col } from "react-bootstrap";

const Searchbar = ({searchbar, closeSearchbar}) => {
  return (
    <div className={searchbar ? 'searchbar searchbar--open' : 'searchbar'}>
      <div className='backdrop' onClick={closeSearchbar}></div>
      <div className="searchbar--main">
        <Form>
          <Row className="align-items-center justify-content-around">
            <Col xs="auto">
            <i className="fa-solid fa-magnifying-glass"/>
            </Col>
            <Col xs="auto">
              <Form.Control size="sm" id="inlineFormInputGroup" placeholder="Search..."  className="m-1 rounded-pill py-1"/>
            </Col>
            
            <Col xs="auto">
              <Form.Select  size="sm" className="rounded-pill m-1">
                <option>Villa</option>
                <option>Food</option>
                <option>Specialty</option>
                <option>Travel</option>
              </Form.Select>
            </Col>

            <Col xs="auto">
              <Button type="submit" size="sm" variant="outline-info" className="rounded-pill m-1">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}

export default Searchbar