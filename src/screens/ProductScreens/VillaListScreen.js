import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ListEachVilla from "../../components/Products/ListEachVilla";
// import products from "../products";  //fetch it from backend

// for searchbar
import ToolBar from "../../components/ToolBar";
import Searchbar from "../../components/Searchbar";

import { Row, Col } from "react-bootstrap";

import Container from "react-bootstrap/Container";

//use react redux to lift up all villas state, start:
import { useDispatch, useSelector } from "react-redux";
import { listVillas } from "../../actions/productActions/villaActions";
//end

//import message and loader component
import Message from "../../components/Loading/Message";
import Loader from "../../components/Loading/Loader";

const VillaListScreen = () => {
  //config react redux
  const dispatch = useDispatch();
  const villaList = useSelector((state) => state.villaList);

  //for product search
  const params = useParams();
  const keyword = params.keyword;

  //for villas state update
  useEffect(() => {
    dispatch(listVillas(keyword));
  }, [dispatch, keyword]);

  // for floating search bar
  const [searchbar, setSearchbar] = useState(false);
  const toggleSearchbar = () => {
    setSearchbar((prevState) => !prevState);
  };

  return (
    <>
      <ToolBar openSearchbar={toggleSearchbar} />
      <Searchbar
        searchbar={searchbar}
        closeSearchbar={toggleSearchbar}
        category="villa"
        className="fa-solid fa-bed"
      />
      <Container className="my-3">
        <h1>Our Villas</h1>
        {villaList.loading ? (
          <Loader color={"#FFE7BF"} />
        ) : villaList.error ? (
          <Message variant="danger">{villaList.error}</Message>
        ) : (
          <Row>
            {villaList.villas.map((villa) => (
              <Col key={villa._id} md={12}>
                <ListEachVilla villa={villa} />
              </Col>
            ))}
          </Row>
        )}
        {/* <Row className="justify-content-md-center">
          <Col xs="auto" lg="2" md="auto">
            <Button className="btn btn-success">Explore More</Button>
          </Col>
        </Row> */}
      </Container>
    </>
  );
};

export default VillaListScreen;
