import {
  SPECIALTY_LIST_REQUEST,
  SPECIALTY_LIST_SUCCESS,
  SPECIALTY_LIST_FAIL,
  SPECIALTY_DETAILS_REQUEST,
  SPECIALTY_DETAILS_SUCCESS,
  SPECIALTY_DETAILS_FAIL,
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
