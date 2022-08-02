import tasResApi from "../../config/api";
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
  FOOD_CREATE_REQUEST,
  FOOD_CREATE_SUCCESS,
  FOOD_CREATE_FAIL,
  FOOD_UPDATE_REQUEST,
  FOOD_UPDATE_SUCCESS,
  FOOD_UPDATE_FAIL,
  FOOD_CREATE_REVIEW_REQUEST,
  FOOD_CREATE_REVIEW_SUCCESS,
  FOOD_CREATE_REVIEW_FAIL,
  FOOD_CREATE_REVIEW_RESET,
} from "../../constants/productsConstant/foodConstants";

export const listFood =
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: FOOD_LIST_REQUEST });
      const { data } = await tasResApi.get(`/api/food?keyword=${keyword}`);
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
    const { data } = await tasResApi.get(`/api/food/${id}`);
    dispatch({ type: FOOD_DETAILS_SUCCESS, payload: data });
    dispatch({ type: FOOD_CREATE_REVIEW_RESET });
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
    const { data } = await tasResApi.delete(`/api/food/${id}`, config);
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

//Admin can create new food product
export const createFood = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FOOD_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await tasResApi.post(`/api/food`, {}, config);
    dispatch({
      type: FOOD_CREATE_SUCCESS,
      payload: data,
    });
    toast(`🌞 ${data.name} is Created Successfully!`);
  } catch (error) {
    dispatch({
      type: FOOD_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Admin can update food product
export const updateFood = (food) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FOOD_UPDATE_REQUEST,
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
    const { data } = await tasResApi.put(`/api/food/${food._id}`, food, config);

    dispatch({
      type: FOOD_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: FOOD_DETAILS_SUCCESS,
      payload: data,
    });
    toast(`🥗 ${data.name} is Created Successfully!`);
  } catch (error) {
    dispatch({
      type: FOOD_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Client can leave comment for food product
export const createFoodReview =
  (foodId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: FOOD_CREATE_REVIEW_REQUEST,
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
        `/api/food/${foodId}/reviews`,
        review,
        config
      );

      dispatch({
        type: FOOD_CREATE_REVIEW_SUCCESS,
      });
      toast(`🤗 ${data.message}`);
    } catch (error) {
      dispatch({
        type: FOOD_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
