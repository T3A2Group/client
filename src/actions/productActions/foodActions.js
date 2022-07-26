import axios from "axios";
import { toast } from "react-toastify";
import {
  FOOD_LIST_REQUEST,
  FOOD_LIST_SUCCESS,
  FOOD_LIST_FAIL,
  FOOD_DETAILS_REQUEST,
  FOOD_DETAILS_SUCCESS,
  FOOD_DETAILS_FAIL,
  FOOD_DELETE_REQUEST,
  FOOD_DELETE_SUCCESS,
  FOOD_DELETE_FAIL,
} from "../../constants/productsConstant/foodConstants";

export const listFood = () => async (dispatch) => {
  try {
    dispatch({ type: FOOD_LIST_REQUEST });
    const { data } = await axios.get("/api/food");
    dispatch({ type: FOOD_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FOOD_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listFoodDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: FOOD_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/food/${id}`);
    dispatch({ type: FOOD_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FOOD_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Admin can delete each food product
export const deleteFood = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FOOD_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/food/${id}`, config);
    dispatch({
      type: FOOD_DELETE_SUCCESS,
    });
    toast(`🗑 ${data.message} Successfully!`);
  } catch (error) {
    dispatch({
      type: FOOD_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
