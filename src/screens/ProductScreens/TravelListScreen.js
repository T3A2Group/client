import React, { useEffect } from "react";
import EachTravel from "../../components/Products/EachTravel";
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
        <h1>Travel Plan</h1>
        {travelList.loading ? (
          <Loader color={"#A10035"} />
        ) : travelList.error ? (
          <Message variant="danger">{travelList.error}</Message>
        ) : (
          <Row>
            {travelList.travel.map((travel) => (
              <Col key={travel._id} sm={12} md={6} lg={4} xl={3}>
                <EachTravel travel={travel} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default TravelListScreen;
