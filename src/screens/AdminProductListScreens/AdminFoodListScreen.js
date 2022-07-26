import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Loading/Message";
import Progresser from "../../components/Loading/Progresser";
import Loader from "../../components/Loading/Loader";
import {
  listFood,
  deleteFood,
  createFood,
} from "../../actions/productActions/foodActions";
import { FOOD_CREATE_RESET } from "../../constants/productsConstant/foodConstants";

const AdminFoodListScreen = () => {
  const nagivateTo = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const foodList = useSelector((state) => state.foodList);
  const { loading, error, food } = foodList;

  const foodDelete = useSelector((state) => state.foodDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = foodDelete;

  const foodCreate = useSelector((state) => state.foodCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    food: createdFood,
  } = foodCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: FOOD_CREATE_RESET });
    //only admin user can check food list, if user is not admin, then redirect to login page
    if (!userInfo.isAdmin) {
      nagivateTo("/login");
    }
    if (successCreate) {
      nagivateTo(`/admin/food/${createdFood._id}/edit`);
    } else {
      dispatch(listFood());
    }
  }, [
    dispatch,
    nagivateTo,
    userInfo,
    successDelete,
    successCreate,
    createdFood,
  ]);

  const deletHandler = (id) => {
    if (window.confirm("Are your sure?")) {
      dispatch(deleteFood(id));
    }
  };

  const createFoodHandler = (food) => {
    //CREATE Food
    dispatch(createFood());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Food List</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3 btn btn-success" onClick={createFoodHandler}>
            <i className="fa-solid fa-circle-plus"></i> Create Food
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Progresser />
      ) : error ? (
        <Message variant="warning">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>FOOD ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {food.map((eachFood) => (
              <tr key={eachFood._id}>
                <td>{eachFood._id}</td>
                <td>{eachFood.name}</td>
                <td>$ {eachFood.price}</td>
                <td>{eachFood.category}</td>
                <td>
                  <div className="btn-group">
                    <LinkContainer to={`/admin/food/${eachFood._id}/edit`}>
                      <Button
                        variant="light"
                        className="btn btn-outline-info btn-sm mx-2"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="light"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deletHandler(eachFood._id)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default AdminFoodListScreen;
