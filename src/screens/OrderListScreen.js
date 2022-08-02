import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Loading/Message";
import Progresser from "../components/Loading/Progresser";
import { listOrders } from "../actions/orderActions";

const OrderListScreen = () => {
  const nagivateTo = useNavigate();
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList; //=> destructures comes from orderReducer/ orderListReducer

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    //only admin user can check userList, if user is not admin, then redirect to login page
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      nagivateTo("/login");
    }
  }, [dispatch, nagivateTo, userInfo]);

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Progresser />
      ) : error ? (
        <Message variant="warning">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL Price</th>
              <th>PAID AT</th>
              <th>DISPATCHED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>$ {order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i
                      className="fa-solid fa-xmark"
                      style={{ color: "red" }}
                    ></i>
                  )}
                </td>
                <td>
                  {order.isDispatched ? (
                    order.dispatchedAt.substring(0, 10)
                  ) : (
                    <i
                      className="fa-solid fa-xmark"
                      style={{ color: "red" }}
                    ></i>
                  )}
                </td>
                <td>
                  <div className="btn-group">
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button
                        variant="light"
                        className="btn btn-outline-info btn-sm mx-2"
                      >
                        <i className="fa-solid fa-magnifying-glass"></i> Check
                      </Button>
                    </LinkContainer>
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

export default OrderListScreen;
