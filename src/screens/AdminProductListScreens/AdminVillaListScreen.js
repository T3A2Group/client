import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Loading/Message";
import Progresser from "../../components/Loading/Progresser";
import { listVillas } from "../../actions/productActions/villaActions";

const AdminVillaListScreen = () => {
  const nagivateTo = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const villaId = id;

  const villaList = useSelector((state) => state.villaList);
  const { loading, error, villas } = villaList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    //only admin user can check villa list, if user is not admin, then redirect to login page
    if (userInfo && userInfo.isAdmin) {
      dispatch(listVillas());
    } else {
      nagivateTo("/login");
    }
  }, [dispatch, nagivateTo, userInfo]);

  const deletHandler = (villaId) => {
    if (window.confirm("Are your sure?")) {
      //delete products
    }
  };

  const createVillaHandler = (villa) => {
    //CREATE VILLA
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Villa List</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3 btn btn-primary" onClick={createVillaHandler}>
            <i className="fa-solid fa-circle-plus"></i> Create Villa
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Progresser />
      ) : error ? (
        <Message variant="warning">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>VILLA ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {villas.map((villa) => (
              <tr key={villa._id}>
                <td>{villa._id}</td>
                <td>{villa.name}</td>
                <td>$ {villa.price}</td>
                <td>{villa.category}</td>
                <td>
                  <div className="btn-group">
                    <LinkContainer to={`/admin/villa/${villa._id}/edit`}>
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
                      onClick={() => deletHandler(villa._id)}
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

export default AdminVillaListScreen;
