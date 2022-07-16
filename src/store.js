import { configureStore } from "@reduxjs/toolkit";

//import 4 different products reducers(List and Singel)
import {
  villaListReducer,
  villaDetailsReducer,
} from "./reducers/productsReducers/villaReducers";
import {
  foodListReducer,
  foodDetailsReducer,
} from "./reducers/productsReducers/foodReducers";
import {
  specialtyListReducer,
  specialtyDetailsReducer,
} from "./reducers/productsReducers/specialtiesReducers";
import {
  travelListReducer,
  travelDetailsReducer,
} from "./reducers/productsReducers/travelReducers";

const initialState = {};

const reducer = {
  villaList: villaListReducer,
  foodList: foodListReducer,
  specialtyList: specialtyListReducer,
  travelList: travelListReducer,

  villaDetails: villaDetailsReducer,
  foodDetails: foodDetailsReducer,
  specialtyDetails: specialtyDetailsReducer,
  travelDetails: travelDetailsReducer,
};

// const middleware = [thunk];

const store = configureStore({
  reducer,
  initialState,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
