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
