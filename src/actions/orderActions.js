import axios from "axios";
import { toast } from "react-toastify";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from "../constants/orderConstants";

//for create order
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    //first for order create request
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/orders`, order, config);
    //when order create request success
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
    toast("🥳 Congrats! You just made an order!");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
