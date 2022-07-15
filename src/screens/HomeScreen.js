import React, { useState, useEffect } from "react";
import EachVilla from "../components/Products/EachVilla";
import EachFood from "../components/Products/EachFood";
import EachSpecialty from "../components/Products/EachSpecialty";
import EachTravel from "../components/Products/EachTravel";
// import products from "../products";  //fetch it from backend
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import axios from "axios";

const HomeScreen = () => {
  const [villas, setVillas] = useState([]);
  const [food, setFood] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [travelPlans, setTravelPlans] = useState([]);

  //for villas state update
  useEffect(() => {
    const fetchVillas = async () => {
      const res = await axios.get("/api/villas"); // at this stage, need to add proxy in package.json
      // console.log(res);
      setVillas(res.data);
    };
    fetchVillas();
  }, []);

  //for food state update
  useEffect(() => {
    const fetchFood = async () => {
      const res = await axios.get("/api/food"); // at this stage, need to add proxy in package.json
      // console.log(res);
      setFood(res.data);
    };
    fetchFood();
  }, []);

  //for specialties state update
  useEffect(() => {
    const fetchSpecialties = async () => {
      const res = await axios.get("/api/specialties"); // at this stage, need to add proxy in package.json
      // console.log(res);
      setSpecialties(res.data);
    };
    fetchSpecialties();
  }, []);

  //for travelPlan state update
  useEffect(() => {
    const fetchTravelPlans = async () => {
      const res = await axios.get("/api/travel"); // at this stage, need to add proxy in package.json
      // console.log(res);
      setTravelPlans(res.data);
    };
    fetchTravelPlans();
  }, []);

  return (
    <>
      <Container className="my-3">
        <h1>Villas</h1>
        <Row>
          {villas.map((villa) => (
            <Col key={villa._id} sm={12} md={6} lg={4} xl={3}>
              <EachVilla villa={villa} />
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="my-3">
        <h1>Food</h1>
        <Row>
          {food.map((food) => (
            <Col key={food._id} sm={12} md={6} lg={4} xl={3}>
              <EachFood food={food} />
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="my-3">
        <h1>Specialties</h1>
        <Row>
          {specialties.map((specialty) => (
            <Col key={specialty._id} sm={12} md={6} lg={4} xl={3}>
              <EachSpecialty specialty={specialty} />
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="my-3">
        <h1>Travel Plan</h1>
        <Row>
          {travelPlans.map((travel) => (
            <Col key={travel._id} sm={12} md={6} lg={4} xl={3}>
              <EachTravel travel={travel} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomeScreen;
