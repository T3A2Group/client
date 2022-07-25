import React, { useEffect } from "react";
import ListEachTravel from "../../components/Products/ListEachTravel";

// import products from "../products";  //fetch it from backend
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";

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

  //for villas,food,specialties,and travelPlan state update
  useEffect(() => {
    dispatch(listTravel());
  }, [dispatch]);

  return (
    <>
      <Container className="my-3">
        <h1>Our Travel Packages</h1>
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
    </>
  );
};

export default TravelListScreen;
