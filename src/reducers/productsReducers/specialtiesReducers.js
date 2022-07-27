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
  SPECIALTY_CREATE_RESET,
  SPECIALTY_UPDATE_REQUEST,
  SPECIALTY_UPDATE_SUCCESS,
  SPECIALTY_UPDATE_FAIL,
  SPECIALTY_UPDATE_RESET,
} from "../../constants/productsConstant/specialtyConstants";

//=> for home screen specialty product list state
export const specialtyListReducer = (state = { specialties: [] }, action) => {
  switch (action.type) {
    case SPECIALTY_LIST_REQUEST:
      return { loading: true, specialties: [] };
    case SPECIALTY_LIST_SUCCESS:
      return { loading: false, specialties: action.payload };
    case SPECIALTY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//=> for home screen specialty product details state
export const specialtyDetailsReducer = (
  state = { specialty: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case SPECIALTY_DETAILS_REQUEST:
      return { loading: true, ...state };
    case SPECIALTY_DETAILS_SUCCESS:
      return { loading: false, specialty: action.payload };
    case SPECIALTY_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//=> for delete each specialty product
export const specialtyDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SPECIALTY_DELETE_REQUEST:
      return { loading: true };
    case SPECIALTY_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SPECIALTY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//=> for create new specialty product
export const specialtyCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SPECIALTY_CREATE_REQUEST:
      return { loading: true };
    case SPECIALTY_CREATE_SUCCESS:
      return { loading: false, success: true, specialty: action.payload };
    case SPECIALTY_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SPECIALTY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

//=> for update specialty product
export const specialtyUpdateReducer = (state = { specialty: {} }, action) => {
  switch (action.type) {
    case SPECIALTY_UPDATE_REQUEST:
      return { loading: true };
    case SPECIALTY_UPDATE_SUCCESS:
      return { loading: false, success: true, specialty: action.payload };
    case SPECIALTY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SPECIALTY_UPDATE_RESET:
      return { specialty: {} };
    default:
      return state;
  }
};
