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
} from "../../actions/productActions/travelActions";

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

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    //only admin user can check villa list, if user is not admin, then redirect to login page
    if (userInfo && userInfo.isAdmin) {
      dispatch(listTravel());
    } else {
      nagivateTo("/login");
    }
  }, [dispatch, nagivateTo, userInfo, successDelete]);

  const deletHandler = (id) => {
    if (window.confirm("Are your sure?")) {
      dispatch(deleteTravel(id));
    }
  };

  const createTravelHandler = (travel) => {
    //CREATE Travel
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
      {loading ? (
        <Progresser />
      ) : error ? (
        <Message variant="warning">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Travel Package ID</th>
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
