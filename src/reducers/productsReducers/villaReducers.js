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
  VILLA_CREATE_RESET,
  VILLA_UPDATE_REQUEST,
  VILLA_UPDATE_SUCCESS,
  VILLA_UPDATE_FAIL,
  VILLA_UPDATE_RESET,
  VILLA_CREATE_REVIEW_REQUEST,
  VILLA_CREATE_REVIEW_SUCCESS,
  VILLA_CREATE_REVIEW_FAIL,
  VILLA_CREATE_REVIEW_RESET,
} from "../../constants/productsConstant/villaConstants";

//=> for home screen villa product list state
export const villaListReducer = (state = { villas: [] }, action) => {
  switch (action.type) {
    case VILLA_LIST_REQUEST:
      return { loading: true, villas: [] };
    case VILLA_LIST_SUCCESS:
      return { loading: false, villas: action.payload };
    case VILLA_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//=> for villa Screen each villa details state
export const villaDetailsReducer = (
  state = { villa: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case VILLA_DETAILS_REQUEST:
      return { loading: true, ...state };
    case VILLA_DETAILS_SUCCESS:
      return { loading: false, villa: action.payload };
    case VILLA_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//=> for delete each villa product
export const villaDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case VILLA_DELETE_REQUEST:
      return { loading: true };
    case VILLA_DELETE_SUCCESS:
      return { loading: false, success: true };
    case VILLA_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//=> for create new villa product
export const villaCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case VILLA_CREATE_REQUEST:
      return { loading: true };
    case VILLA_CREATE_SUCCESS:
      return { loading: false, success: true, villa: action.payload };
    case VILLA_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case VILLA_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

//=> for update villa product
export const villaUpdateReducer = (state = { villa: {} }, action) => {
  switch (action.type) {
    case VILLA_UPDATE_REQUEST:
      return { loading: true };
    case VILLA_UPDATE_SUCCESS:
      return { loading: false, success: true, villa: action.payload };
    case VILLA_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case VILLA_UPDATE_RESET:
      return { villa: {} };
    default:
      return state;
  }
};

//=> for client can create villa review
export const villaReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case VILLA_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case VILLA_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case VILLA_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case VILLA_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
