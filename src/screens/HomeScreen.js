import React, { useEffect } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
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
import { Link } from "react-router-dom";

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
      <HelmetProvider>
        <Helmet>
          <title>Welcome to Tas Resort | Home</title>
        </Helmet>
        <Container className="my-3">
          <h1>Popular Villas</h1>
          {villaList.loading ? (
            <Loader color={"#FFE7BF"} />
          ) : villaList.error ? (
            <Message variant="danger">{villaList.error}</Message>
          ) : (
            <Row>
              {villaList.villas
                .filter((villa) => villa.rating >= 4.5)
                .map((v) => (
                  <Col key={v._id} sm={12} md={6} lg={4} xl={3}>
                    <EachVilla villa={v} />
                  </Col>
                ))}
            </Row>
          )}
          <Row className="row justify-content-center">
            <Col xs="auto" lg="3" md="auto">
              <Link to="/villa" style={{ textDecoration: "none" }}>
                <strong>Explore More Villas </strong>
                <i className="fa-solid fa-angles-right"></i>
              </Link>
            </Col>
          </Row>
        </Container>

        <Container className="my-3">
          <h1>Favourite Food</h1>
          {foodList.loading ? (
            <Loader color={"#FFC4C4"} />
          ) : foodList.error ? (
            <Message variant="danger">{foodList.error}</Message>
          ) : (
            <Row>
              {foodList.food
                .filter((food) => food.rating >= 4.5)
                .map((f) => (
                  <Col key={f._id} sm={12} md={6} lg={4} xl={3}>
                    <EachFood food={f} />
                  </Col>
                ))}
            </Row>
          )}
          <Row className="row justify-content-center">
            <Col xs="auto" lg="3" md="auto">
              <Link to="/food" style={{ textDecoration: "none" }}>
                <strong>Explore More Food </strong>
                <i className="fa-solid fa-angles-right"></i>
              </Link>
            </Col>
          </Row>
        </Container>

        <Container className="my-3">
          <h1>Great Specialties</h1>
          {specialtyList.loading ? (
            <Loader color={"#FF869E"} />
          ) : specialtyList.error ? (
            <Message variant="danger">{specialtyList.error}</Message>
          ) : (
            <Row>
              {specialtyList.specialties
                .filter((specialty) => specialty.rating >= 4.5)
                .map((s) => (
                  <Col key={s._id} sm={12} md={6} lg={4} xl={3}>
                    <EachSpecialty specialty={s} />
                  </Col>
                ))}
            </Row>
          )}
          <Row className="row justify-content-center">
            <Col xs="auto" lg="3" md="auto">
              <Link to="/specialty" style={{ textDecoration: "none" }}>
                <strong>Explore More Specialties </strong>
                <i className="fa-solid fa-angles-right"></i>
              </Link>
            </Col>
          </Row>
        </Container>

        <Container className="my-3">
          <h1>Travel Plan</h1>
          {travelList.loading ? (
            <Loader color={"#A10035"} />
          ) : travelList.error ? (
            <Message variant="danger">{travelList.error}</Message>
          ) : (
            <Row>
              {travelList.travel
                .filter((travel) => travel.rating >= 4.5)
                .map((t) => (
                  <Col key={t._id} sm={12} md={6} lg={4} xl={3}>
                    <EachTravel travel={t} />
                  </Col>
                ))}
            </Row>
          )}
          <Row className="row justify-content-center">
            <Col xs="auto" lg="3" md="auto">
              <Link to="/travel" style={{ textDecoration: "none" }}>
                <strong>Explore More Travel Plans </strong>
                <i className="fa-solid fa-angles-right"></i>
              </Link>
            </Col>
          </Row>
        </Container>
      </HelmetProvider>
    </>
  );
};

export default HomeScreen;
