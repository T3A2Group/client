import backend from "../utils/setBaseUrl";
import { toast } from "react-toastify";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../constants/userConstants";
import { ORDER_MY_LIST_RESET } from "../constants/orderConstants";

//for user login
export const login = (email, password) => async (dispatch) => {
  try {
    //first: user login
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await backend.post(
      "/api/users/login",
      { email, password },
      config
    );
    //after user login success
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    toast(`🥳 Welcome ${data.name}`); //for current username
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    //if user login fail
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//for user logout
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("paymentMethod");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_MY_LIST_RESET });
  dispatch({ type: USER_LIST_RESET });
  document.location.href = "/login";
  toast("👋 Bye, Have a lovely day!");
};

//for user register
export const register = (name, email, password) => async (dispatch) => {
  try {
    //first: user register
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await backend.post(
      "/api/users",
      { name, email, password },
      config
    );
    //after user register success,they also login success
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    toast.success("🥳 User Registered Successfully!");
    //automatically log the user in after a successful registration
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    //if user login fail
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//for user profile details
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    //first: user details request
    dispatch({
      type: USER_DETAILS_REQUEST,
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
    const { data } = await backend.get(`/api/users/${id}`, config);
    //after get user profile details success
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//for update user profile details
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    //first: user details update request
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
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
    const { data } = await backend.put(`/api/users/profile`, user, config);
    //after get user profile update details success
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    toast("🥳 User Profile Updated Successfully!");
    //automatically log the user in after a successful registration
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Below actions is only for Admin user:
//for get user list (Only for admin users)
export const listUsers = () => async (dispatch, getState) => {
  try {
    //first: user list request
    dispatch({
      type: USER_LIST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await backend.get(`/api/users`, config);
    //after get user list success
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//for get user list (Only for admin users)
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    //first: delete user request
    dispatch({
      type: USER_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await backend.delete(`/api/users/${id}`, config);
    //after delete user success
    dispatch({
      type: USER_DELETE_SUCCESS,
    });
    toast(`✅ ${data.message} Successfully!`);
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//for update user (Only for admin users)
export const updateUser = (user) => async (dispatch, getState) => {
  try {
    //first: update user request
    dispatch({
      type: USER_UPDATE_REQUEST,
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
    const { data } = await backend.put(`/api/users/${user._id}`, user, config);
    //after update user success
    dispatch({
      type: USER_UPDATE_SUCCESS,
    });
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
    toast(`🎉 User Updated Successfully!`);
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
