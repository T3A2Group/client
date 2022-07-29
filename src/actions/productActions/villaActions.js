import backend from "../../utils/setBaseUrl";
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
  VILLA_UPDATE_REQUEST,
  VILLA_UPDATE_SUCCESS,
  VILLA_UPDATE_FAIL,
  VILLA_CREATE_REVIEW_REQUEST,
  VILLA_CREATE_REVIEW_SUCCESS,
  VILLA_CREATE_REVIEW_FAIL,
  VILLA_CREATE_REVIEW_RESET,
} from "../../constants/productsConstant/villaConstants";

export const listVillas =
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: VILLA_LIST_REQUEST });
      const { data } = await backend.get(`/api/villa?keyword=${keyword}`);
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
    const { data } = await backend.get(`/api/villa/${id}`);
    dispatch({ type: VILLA_DETAILS_SUCCESS, payload: data });
    dispatch({ type: VILLA_CREATE_REVIEW_RESET });
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
    const { data } = await backend.delete(`/api/villa/${id}`, config);
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
    const { data } = await backend.post(`/api/villa`, {}, config);
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

//Admin can update villa product
export const updateVilla = (villa) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VILLA_UPDATE_REQUEST,
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
    const { data } = await backend.put(`/api/villa/${villa._id}`, villa, config);

    dispatch({
      type: VILLA_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: VILLA_DETAILS_SUCCESS,
      payload: data,
    });
    toast(`🏠 ${data.name} is Created Successfully!`);
  } catch (error) {
    dispatch({
      type: VILLA_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Client can leave comment for villa product
export const createVillaReview =
  (villaId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: VILLA_CREATE_REVIEW_REQUEST,
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
      const { data } = await backend.post(
        `/api/villa/${villaId}/reviews`,
        review,
        config
      );

      dispatch({
        type: VILLA_CREATE_REVIEW_SUCCESS,
      });
      toast(`🤗 ${data.message}`);
    } catch (error) {
      dispatch({
        type: VILLA_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
