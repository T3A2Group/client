import React, { useEffect } from "react";
import ListEachVilla from "../../components/Products/ListEachVilla";
// import products from "../products";  //fetch it from backend
import { Row, Col, Button } from "react-bootstrap";
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

  //for villas,food,specialties,and travelPlan state update
  useEffect(() => {
    dispatch(listVillas());
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