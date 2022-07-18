import React, { useEffect } from "react";
import EachVilla from "../components/Products/EachVilla";
import EachFood from "../components/Products/EachFood";
import EachSpecialty from "../components/Products/EachSpecialty";
import EachTravel from "../components/Products/EachTravel";
// import products from "../products";  //fetch it from backend
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";

//use react redux to lift up all products state, start:
import { useDispatch, useSelector } from "react-redux";
import { listVillas } from "../actions/productActions/villaActions";
import { listFood } from "../actions/productActions/foodActions";
import { listSpecialties } from "../actions/productActions/specialtyActions";
import { listTravel } from "../actions/productActions/travelActions";
//end

//import message and loader component
import Message from "../components/Loading/Message";
import Loader from "../components/Loading/Loader";

const HomeScreen = () => {
  //config react redux
  const dispatch = useDispatch();
  const villaList = useSelector((state) => state.villaList);
  const foodList = useSelector((state) => state.foodList);
  const specialtyList = useSelector((state) => state.specialtyList);
  const travelList = useSelector((state) => state.travelList);

  //for villas,food,specialties,and travelPlan state update
  useEffect(() => {
    dispatch(listVillas());
    dispatch(listFood());
    dispatch(listSpecialties());
    dispatch(listTravel());
  }, [dispatch]);

  return (
    <>
      <Container className="my-3">
        <h1>Villas</h1>
        {villaList.loading ? (
          <Loader color={"#FFE7BF"} />
        ) : villaList.error ? (
          <Message variant="danger">{villaList.error}</Message>
        ) : (
          <Row>
            {villaList.villas.map((villa) => (
              <Col key={villa._id} sm={12} md={6} lg={4} xl={3}>
                <EachVilla villa={villa} />
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

      <Container className="my-3">
        <h1>Food</h1>
        {foodList.loading ? (
          <Loader color={"#FFC4C4"} />
        ) : foodList.error ? (
          <Message variant="danger">{foodList.error}</Message>
        ) : (
          <Row>
            {foodList.food.map((food) => (
              <Col key={food._id} sm={12} md={6} lg={4} xl={3}>
                <EachFood food={food} />
              </Col>
            ))}
          </Row>
        )}
      </Container>

      <Container className="my-3">
        <h1>Specialties</h1>
        {specialtyList.loading ? (
          <Loader color={"#FF869E"} />
        ) : specialtyList.error ? (
          <Message variant="danger">{specialtyList.error}</Message>
        ) : (
          <Row>
            {specialtyList.specialties.map((specialty) => (
              <Col key={specialty._id} sm={12} md={6} lg={4} xl={3}>
                <EachSpecialty specialty={specialty} />
              </Col>
            ))}
          </Row>
        )}
      </Container>

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

export default HomeScreen;
