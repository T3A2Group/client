import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Loading/Message";
import Progresser from "../../components/Loading/Progresser";
import Loader from "../../components/Loading/Loader";
import {
  listTravel,
  deleteTravel,
  createTravel,
} from "../../actions/productActions/travelActions";
import { TRAVEL_CREATE_RESET } from "../../constants/productsConstant/travelConstants";

const AdminTravelListScreen = () => {
  const nagivateTo = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const travelList = useSelector((state) => state.travelList);
  const { loading, error, travel } = travelList;

  const travelDelete = useSelector((state) => state.travelDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = travelDelete;

  const travelCreate = useSelector((state) => state.travelCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    travel: createdTravel,
  } = travelCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: TRAVEL_CREATE_RESET });
    //only admin user can check villa list, if user is not admin, then redirect to login page
    if (!userInfo.isAdmin) {
      nagivateTo("/login");
    }
    if (successCreate) {
      nagivateTo(`/admin/travel/${createdTravel._id}/edit`);
    } else {
      dispatch(listTravel());
    }
  }, [
    dispatch,
    nagivateTo,
    userInfo,
    successDelete,
    successCreate,
    createdTravel,
  ]);

  const deletHandler = (id) => {
    if (window.confirm("Are your sure?")) {
      dispatch(deleteTravel(id));
    }
  };

  const createTravelHandler = (travel) => {
    //CREATE Travel
    dispatch(createTravel());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Travel Plan List</h1>
        </Col>
        <Col className="text-end">
          <Button
            className="my-3 btn btn-warning"
            onClick={createTravelHandler}
          >
            <i className="fa-solid fa-circle-plus"></i> Create Travel
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
              <th>Travel Plan ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {travel.map((eachTravel) => (
              <tr key={eachTravel._id}>
                <td>{eachTravel._id}</td>
                <td>{eachTravel.name}</td>
                <td>$ {eachTravel.price}</td>
                <td>{eachTravel.category}</td>
                <td>
                  <div className="btn-group">
                    <LinkContainer to={`/admin/travel/${eachTravel._id}/edit`}>
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
                      onClick={() => deletHandler(eachTravel._id)}
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

export default AdminTravelListScreen;
