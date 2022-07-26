import axios from "axios";
import { toast } from "react-toastify";
import {
  TRAVEL_LIST_REQUEST,
  TRAVEL_LIST_SUCCESS,
  TRAVEL_LIST_FAIL,
  TRAVEL_DETAILS_REQUEST,
  TRAVEL_DETAILS_SUCCESS,
  TRAVEL_DETAILS_FAIL,
  TRAVEL_DELETE_REQUEST,
  TRAVEL_DELETE_SUCCESS,
  TRAVEL_DELETE_FAIL,
} from "../../constants/productsConstant/travelConstants";

export const listTravel = () => async (dispatch) => {
  try {
    dispatch({ type: TRAVEL_LIST_REQUEST });
    const { data } = await axios.get("/api/travel");
    dispatch({ type: TRAVEL_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TRAVEL_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTravelDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TRAVEL_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/travel/${id}`);
    dispatch({ type: TRAVEL_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TRAVEL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Admin can delete each travel product
export const deleteTravel = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRAVEL_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/travel/${id}`, config);
    dispatch({
      type: TRAVEL_DELETE_SUCCESS,
    });
    toast(`🗑 ${data.message} Successfully!`);
  } catch (error) {
    dispatch({
      type: TRAVEL_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
