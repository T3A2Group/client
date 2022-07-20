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
import { cartReducer } from "./reducers/cartReducers";
import { userLoginReducer } from "./reducers/userReducers";

const reducer = {
  villaList: villaListReducer,
  foodList: foodListReducer,
  specialtyList: specialtyListReducer,
  travelList: travelListReducer,

  villaDetails: villaDetailsReducer,
  foodDetails: foodDetailsReducer,
  specialtyDetails: specialtyDetailsReducer,
  travelDetails: travelDetailsReducer,

  cart: cartReducer,

  userLogin: userLoginReducer,
};

//get cart Items from local storage,this is for preload state,even user fresh the page, cart item still in there if there is any
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
// get userInfo from local storage,this is for preload state,even user fresh the page, user still in login status
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const preloadedState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage }, //so initial userInfo will always comes from local storage,if there is any
};

const store = configureStore({
  reducer,
  preloadedState,
  devTools: process.env.NODE_ENV !== "production", //=> only show devTools when in production
});

export default store;
