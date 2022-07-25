import React, { useEffect } from "react";
import EachFood from "../../components/Products/EachFood";

// import products from "../products";  //fetch it from backend
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";

//use react redux to lift up all products state, start:
import { useDispatch, useSelector } from "react-redux";
import { listFood } from "../../actions/productActions/foodActions";
//end

//import message and loader component
import Message from "../../components/Loading/Message";
import Loader from "../../components/Loading/Loader";

const FoodListScreen = () => {
  //config react redux
  const dispatch = useDispatch();
  const foodList = useSelector((state) => state.foodList);

  //for villas,food,specialties,and travelPlan state update
  useEffect(() => {
    dispatch(listFood());
  }, [dispatch]);

  return (
    <>
      <Container className="my-3">
        <h1>Our Restaurant</h1>
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
    </>
  );
};


export default FoodListScreen;

