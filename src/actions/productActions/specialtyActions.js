import tasResApi from "../../config/api";
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
  SPECIALTY_UPDATE_REQUEST,
  SPECIALTY_UPDATE_SUCCESS,
  SPECIALTY_UPDATE_FAIL,
  SPECIALTY_CREATE_REVIEW_REQUEST,
  SPECIALTY_CREATE_REVIEW_SUCCESS,
  SPECIALTY_CREATE_REVIEW_FAIL,
  SPECIALTY_CREATE_REVIEW_RESET,
} from "../../constants/productsConstant/specialtyConstants";

export const listSpecialties =
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: SPECIALTY_LIST_REQUEST });
      const { data } = await tasResApi.get(`/api/specialty?keyword=${keyword}`);
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
    const { data } = await tasResApi.get(`/api/specialty/${id}`);
    dispatch({ type: SPECIALTY_DETAILS_SUCCESS, payload: data });
    dispatch({ type: SPECIALTY_CREATE_REVIEW_RESET });
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
    const { data } = await tasResApi.delete(`/api/specialty/${id}`, config);
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
    const { data } = await tasResApi.post(`/api/specialty`, {}, config);
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

//Admin can update specialty product
export const updateSpecialty = (specialty) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SPECIALTY_UPDATE_REQUEST,
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
    const { data } = await tasResApi.put(
      `/api/specialty/${specialty._id}`,
      specialty,
      config
    );

    dispatch({
      type: SPECIALTY_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: SPECIALTY_DETAILS_SUCCESS,
      payload: data,
    });
    toast(`🎁 ${data.name} is Created Successfully!`);
  } catch (error) {
    dispatch({
      type: SPECIALTY_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Client can leave comment for specialty product
export const createSpecialtyReview =
  (specialtyId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SPECIALTY_CREATE_REVIEW_REQUEST,
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
      const { data } = await tasResApi.post(
        `/api/specialty/${specialtyId}/reviews`,
        review,
        config
      );

      dispatch({
        type: SPECIALTY_CREATE_REVIEW_SUCCESS,
      });
      toast(`🤗 ${data.message}`);
    } catch (error) {
      dispatch({
        type: SPECIALTY_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
