import axios from "axios";
import { toast } from "react-toastify";
import {
  VILLA_LIST_REQUEST,
  VILLA_LIST_SUCCESS,
  VILLA_LIST_FAIL,
  VILLA_DETAILS_REQUEST,
  VILLA_DETAILS_SUCCESS,
  VILLA_DETAILS_FAIL,
  VILLA_DELETE_REQUEST,
  VILLA_DELETE_SUCCESS,
  VILLA_DELETE_FAIL,
  VILLA_CREATE_REQUEST,
  VILLA_CREATE_SUCCESS,
  VILLA_CREATE_FAIL,
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

//Admin can delete each villa product
export const deleteVilla = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VILLA_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/villa/${id}`, config);
    dispatch({
      type: VILLA_DELETE_SUCCESS,
    });
    toast(`🗑 ${data.message} Successfully!`);
  } catch (error) {
    dispatch({
      type: VILLA_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Admin can create new villa product
export const createVilla = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: VILLA_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/villa`, {}, config);
    dispatch({
      type: VILLA_CREATE_SUCCESS,
      payload: data,
    });
    toast(`🌞 ${data.name} is Created Successfully!`);
  } catch (error) {
    dispatch({
      type: VILLA_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
