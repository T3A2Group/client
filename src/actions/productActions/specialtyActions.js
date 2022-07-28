import backend from "../../utils/axiosCreate";
import { toast } from "react-toastify";
import {
  SPECIALTY_LIST_REQUEST,
  SPECIALTY_LIST_SUCCESS,
  SPECIALTY_LIST_FAIL,
  SPECIALTY_DETAILS_REQUEST,
  SPECIALTY_DETAILS_SUCCESS,
  SPECIALTY_DETAILS_FAIL,
  SPECIALTY_DELETE_REQUEST,
  SPECIALTY_DELETE_SUCCESS,
  SPECIALTY_DELETE_FAIL,
  SPECIALTY_CREATE_REQUEST,
  SPECIALTY_CREATE_SUCCESS,
  SPECIALTY_CREATE_FAIL,
} from "../../constants/productsConstant/specialtyConstants";

export const listSpecialties = () => async (dispatch) => {
  try {
    dispatch({ type: SPECIALTY_LIST_REQUEST });
    const { data } = await backend.get("/api/specialty");
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
    const { data } = await backend.get(`/api/specialty/${id}`);
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

//Admin can delete each specialty product
export const deleteSpecialty = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SPECIALTY_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await backend.delete(`/api/specialty/${id}`, config);
    dispatch({
      type: SPECIALTY_DELETE_SUCCESS,
    });
    toast(`🗑 ${data.message} Successfully!`);
  } catch (error) {
    dispatch({
      type: SPECIALTY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Admin can create new specialty product
export const createSpecialty = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SPECIALTY_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await backend.post(`/api/specialty`, {}, config);
    dispatch({
      type: SPECIALTY_CREATE_SUCCESS,
      payload: data,
    });
    toast(`🌞 ${data.name} is Created Successfully!`);
  } catch (error) {
    dispatch({
      type: SPECIALTY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
