import React, { useEffect } from "react";
import EachSpecialty from "../../components/Products/EachSpecialty";

// import products from "../products";  //fetch it from backend
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";

//use react redux to lift up all products state, start:
import { useDispatch, useSelector } from "react-redux";
import { listSpecialties } from "../../actions/productActions/specialtyActions";
//end

//import message and loader component
import Message from "../../components/Loading/Message";
import Loader from "../../components/Loading/Loader";

const SpecialtyListScreen = () => {
  //config react redux
  const dispatch = useDispatch();
  const specialtyList = useSelector((state) => state.specialtyList);

  //for villas,food,specialties,and travelPlan state update
  useEffect(() => {
    dispatch(listSpecialties());
  }, [dispatch]);

  return (
    <>
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
    </>
  );
};

export default SpecialtyListScreen;
