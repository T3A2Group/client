import axios from "axios";
import {
  SPECIALTY_LIST_REQUEST,
  SPECIALTY_LIST_SUCCESS,
  SPECIALTY_LIST_FAIL,
  SPECIALTY_DETAILS_REQUEST,
  SPECIALTY_DETAILS_SUCCESS,
  SPECIALTY_DETAILS_FAIL,
} from "../../constants/productsConstant/specialtyConstants";

export const listSpecialties = () => async (dispatch) => {
  try {
    dispatch({ type: SPECIALTY_LIST_REQUEST });
    const { data } = await axios.get("/api/specialty");
    dispatch({ type: SPECIALTY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SPECIALTY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listSpecialtyDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SPECIALTY_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/specialty/${id}`);
    dispatch({ type: SPECIALTY_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SPECIALTY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
