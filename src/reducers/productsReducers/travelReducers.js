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
