import axios from "axios";
import {
  VILLA_LIST_REQUEST,
  VILLA_LIST_SUCCESS,
  VILLA_LIST_FAIL,
  VILLA_DETAILS_REQUEST,
  VILLA_DETAILS_SUCCESS,
  VILLA_DETAILS_FAIL,
} from "../../constants/productsConstant/villaConstants";

export const listVillas = () => async (dispatch) => {
  try {
    dispatch({ type: VILLA_LIST_REQUEST });
    const { data } = await axios.get("/api/villa");
    dispatch({ type: VILLA_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: VILLA_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listVillaDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: VILLA_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/villa/${id}`);
    dispatch({ type: VILLA_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: VILLA_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
