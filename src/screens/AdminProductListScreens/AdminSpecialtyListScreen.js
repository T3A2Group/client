import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Loading/Message";
import Progresser from "../../components/Loading/Progresser";
import { listSpecialties } from "../../actions/productActions/specialtyActions";

const AdminSpecialtyListScreen = () => {
  const nagivateTo = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const specialtyId = id;

  const specialtyList = useSelector((state) => state.specialtyList);
  const { loading, error, specialties } = specialtyList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    //only admin user can check villa list, if user is not admin, then redirect to login page
    if (userInfo && userInfo.isAdmin) {
      dispatch(listSpecialties());
    } else {
      nagivateTo("/login");
    }
  }, [dispatch, nagivateTo, userInfo]);

  const deletHandler = (specialtyId) => {
    if (window.confirm("Are your sure?")) {
      //delete products
    }
  };

  const createSpecialtyHandler = (specialty) => {
    //CREATE Specialty
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Specialty List</h1>
        </Col>
        <Col className="text-end">
          <Button
            className="my-3 btn btn-info"
            onClick={createSpecialtyHandler}
          >
            <i className="fa-solid fa-circle-plus"></i> Create Specialty
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
              <th>SPECIALTY ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {specialties.map((specialty) => (
              <tr key={specialty._id}>
                <td>{specialty._id}</td>
                <td>{specialty.name}</td>
                <td>$ {specialty.price}</td>
                <td>{specialty.category}</td>
                <td>
                  <div className="btn-group">
                    <LinkContainer
                      to={`/admin/specialty/${specialty._id}/edit`}
                    >
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
                      onClick={() => deletHandler(specialty._id)}
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

export default AdminSpecialtyListScreen;
