import {
  TRAVEL_LIST_REQUEST,
  TRAVEL_LIST_SUCCESS,
  TRAVEL_LIST_FAIL,
  TRAVEL_DETAILS_REQUEST,
  TRAVEL_DETAILS_SUCCESS,
  TRAVEL_DETAILS_FAIL,
  TRAVEL_DELETE_REQUEST,
  TRAVEL_DELETE_SUCCESS,
  TRAVEL_DELETE_FAIL,
  TRAVEL_CREATE_REQUEST,
  TRAVEL_CREATE_SUCCESS,
  TRAVEL_CREATE_FAIL,
  TRAVEL_CREATE_RESET,
  TRAVEL_UPDATE_REQUEST,
  TRAVEL_UPDATE_SUCCESS,
  TRAVEL_UPDATE_FAIL,
  TRAVEL_UPDATE_RESET,
} from "../../constants/productsConstant/travelConstants";

//=> for home screen travel product list state
export const travelListReducer = (state = { travel: [] }, action) => {
  switch (action.type) {
    case TRAVEL_LIST_REQUEST:
      return { loading: true, travel: [] };
    case TRAVEL_LIST_SUCCESS:
      return { loading: false, travel: action.payload };
    case TRAVEL_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//=> for Travel Screen each travel details state
export const travelDetailsReducer = (
  state = { travel: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case TRAVEL_DETAILS_REQUEST:
      return { loading: true, ...state };
    case TRAVEL_DETAILS_SUCCESS:
      return { loading: false, travel: action.payload };
    case TRAVEL_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//=> for delete each travel product
export const travelDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TRAVEL_DELETE_REQUEST:
      return { loading: true };
    case TRAVEL_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TRAVEL_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//=> for create new travel plan product
export const travelCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TRAVEL_CREATE_REQUEST:
      return { loading: true };
    case TRAVEL_CREATE_SUCCESS:
      return { loading: false, success: true, travel: action.payload };
    case TRAVEL_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TRAVEL_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

//=> for update travel plan product
export const travelUpdateReducer = (state = { travel: {} }, action) => {
  switch (action.type) {
    case TRAVEL_UPDATE_REQUEST:
      return { loading: true };
    case TRAVEL_UPDATE_SUCCESS:
      return { loading: false, success: true, travel: action.payload };
    case TRAVEL_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TRAVEL_UPDATE_RESET:
      return { travel: {} };
    default:
      return state;
  }
};
