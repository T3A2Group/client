import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Loading/Message";
import Progresser from "../../components/Loading/Progresser";
import Loader from "../../components/Loading/Loader";
import {
  listVillas,
  deleteVilla,
  createVilla,
} from "../../actions/productActions/villaActions";
import { VILLA_CREATE_RESET } from "../../constants/productsConstant/villaConstants";

const AdminVillaListScreen = () => {
  const nagivateTo = useNavigate();
  const dispatch = useDispatch();
  // const { id } = useParams();

  const villaList = useSelector((state) => state.villaList);
  const { loading, error, villas } = villaList;

  const villaDelete = useSelector((state) => state.villaDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = villaDelete;

  const villaCreate = useSelector((state) => state.villaCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    villa: createdVilla,
  } = villaCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: VILLA_CREATE_RESET });

    //only admin user can check villa list, if user is not admin, then redirect to login page
    if (!userInfo.isAdmin) {
      nagivateTo("/login");
    }
    if (successCreate) {
      nagivateTo(`/admin/villa/${createdVilla._id}/edit`);
    } else {
      dispatch(listVillas());
    }
  }, [
    dispatch,
    nagivateTo,
    userInfo,
    successDelete,
    successCreate,
    createdVilla,
  ]);

  const deletHandler = (id) => {
    if (window.confirm("Are your sure?")) {
      dispatch(deleteVilla(id));
    }
  };

  const createVillaHandler = () => {
    //CREATE VILLA
    dispatch(createVilla());
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
