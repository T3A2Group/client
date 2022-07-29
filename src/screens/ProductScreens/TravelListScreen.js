import React, { useState, useEffect } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import ListEachTravel from "../../components/Products/ListEachTravel";
// import products from "../products";  //fetch it from backend
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";

//for search bar
import { useParams } from "react-router-dom";
import ToolBar from "../../components/ToolBar";
import Searchbar from "../../components/Searchbar";

//use react redux to lift up all products state, start:
import { useDispatch, useSelector } from "react-redux";
import { listTravel } from "../../actions/productActions/travelActions";
//end

//import message and loader component
import Message from "../../components/Loading/Message";
import Loader from "../../components/Loading/Loader";

const TravelListScreen = () => {
  //config react redux
  const dispatch = useDispatch();
  const travelList = useSelector((state) => state.travelList);

  //for product search
  const params = useParams();
  const keyword = params.keyword;

  //for travelPlan state update
  useEffect(() => {
    dispatch(listTravel(keyword));
  }, [dispatch, keyword]);

  // for floating search bar
  const [searchbar, setSearchbar] = useState(false);
  const toggleSearchbar = () => {
    setSearchbar((prevState) => !prevState);
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Welcome to Tas Resort | Tours</title>
        </Helmet>
        <ToolBar openSearchbar={toggleSearchbar} />
        <Searchbar
          searchbar={searchbar}
          closeSearchbar={toggleSearchbar}
          category="travel"
          className="fa-solid fa-map-location-dot"
        />
        <Container className="my-3">
          <h1>Our Travel Plans</h1>
          {travelList.loading ? (
            <Loader color={"#A10035"} />
          ) : travelList.error ? (
            <Message variant="danger">{travelList.error}</Message>
          ) : (
            <Row>
              {travelList.travel.map((travel) => (
                <Col key={travel._id} md={12}>
                  <ListEachTravel travel={travel} />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </HelmetProvider>
    </>
  );
};

export default TravelListScreen;
