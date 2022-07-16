import axios from "axios";
import {
  TRAVEL_LIST_REQUEST,
  TRAVEL_LIST_SUCCESS,
  TRAVEL_LIST_FAIL,
  TRAVEL_DETAILS_REQUEST,
  TRAVEL_DETAILS_SUCCESS,
  TRAVEL_DETAILS_FAIL,
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
