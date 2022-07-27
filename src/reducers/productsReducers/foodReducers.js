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
  FOOD_CREATE_RESET,
  FOOD_UPDATE_REQUEST,
  FOOD_UPDATE_SUCCESS,
  FOOD_UPDATE_FAIL,
  FOOD_UPDATE_RESET,
} from "../../constants/productsConstant/foodConstants";

//=> for home screen food product list state
export const foodListReducer = (state = { food: [] }, action) => {
  switch (action.type) {
    case FOOD_LIST_REQUEST:
      return { loading: true, food: [] };
    case FOOD_LIST_SUCCESS:
      return { loading: false, food: action.payload };
    case FOOD_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//=> for food Screen each food details state
export const foodDetailsReducer = (
  state = { food: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case FOOD_DETAILS_REQUEST:
      return { loading: true, ...state };
    case FOOD_DETAILS_SUCCESS:
      return { loading: false, food: action.payload };
    case FOOD_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//=> for delete each food product
export const foodDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case FOOD_DELETE_REQUEST:
      return { loading: true };
    case FOOD_DELETE_SUCCESS:
      return { loading: false, success: true };
    case FOOD_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//=> for create new food product
export const foodCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case FOOD_CREATE_REQUEST:
      return { loading: true };
    case FOOD_CREATE_SUCCESS:
      return { loading: false, success: true, food: action.payload };
    case FOOD_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case FOOD_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

//=> for update food product
export const foodUpdateReducer = (state = { food: {} }, action) => {
  switch (action.type) {
    case FOOD_UPDATE_REQUEST:
      return { loading: true };
    case FOOD_UPDATE_SUCCESS:
      return { loading: false, success: true, food: action.payload };
    case FOOD_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case FOOD_UPDATE_RESET:
      return { food: {} };
    default:
      return state;
  }
};
