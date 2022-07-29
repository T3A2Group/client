import { configureStore } from "@reduxjs/toolkit";

//import 4 different products reducers(List and Singel)
import {
  villaListReducer,
  villaDetailsReducer,
  villaDeleteReducer,
  villaCreateReducer,
  villaUpdateReducer,
  villaReviewCreateReducer,
} from "./reducers/productsReducers/villaReducers";
import {
  foodListReducer,
  foodDetailsReducer,
  foodDeleteReducer,
  foodCreateReducer,
  foodUpdateReducer,
  foodReviewCreateReducer,
} from "./reducers/productsReducers/foodReducers";
import {
  specialtyListReducer,
  specialtyDetailsReducer,
  specialtyDeleteReducer,
  specialtyCreateReducer,
  specialtyUpdateReducer,
  specialtyReviewCreateReducer,
} from "./reducers/productsReducers/specialtiesReducers";
import {
  travelListReducer,
  travelDetailsReducer,
  travelDeleteReducer,
  travelCreateReducer,
  travelUpdateReducer,
  travelReviewCreateReducer,
} from "./reducers/productsReducers/travelReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderMyListReducer,
  orderListReducer,
  orderDispatchReducer,
} from "./reducers/orderReducers";

const reducer = {
  villaList: villaListReducer,
  foodList: foodListReducer,
  specialtyList: specialtyListReducer,
  travelList: travelListReducer,

  villaDetails: villaDetailsReducer,
  foodDetails: foodDetailsReducer,
  specialtyDetails: specialtyDetailsReducer,
  travelDetails: travelDetailsReducer,

  villaDelete: villaDeleteReducer,
  foodDelete: foodDeleteReducer,
  specialtyDelete: specialtyDeleteReducer,
  travelDelete: travelDeleteReducer,

  villaCreate: villaCreateReducer,
  foodCreate: foodCreateReducer,
  specialtyCreate: specialtyCreateReducer,
  travelCreate: travelCreateReducer,

  villaUpdate: villaUpdateReducer,
  foodUpdate: foodUpdateReducer,
  specialtyUpdate: specialtyUpdateReducer,
  travelUpdate: travelUpdateReducer,

  villaReviewCreate: villaReviewCreateReducer,
  foodReviewCreate: foodReviewCreateReducer,
  specialtyReviewCreate: specialtyReviewCreateReducer,
  travelReviewCreate: travelReviewCreateReducer,

  cart: cartReducer,

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,

  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMyList: orderMyListReducer,

  orderList: orderListReducer,
  orderDispatch: orderDispatchReducer,
};

//get cart Items from local storage,this is for preload state,even user fresh the page, cart item still in there if there is any
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
// get userInfo from local storage,this is for preload state,even user fresh the page, user still in login status
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
// get shipping address from local storage, this is for preload state,even user fresh the page, shipping address still in login status
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const preloadedState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage }, //so initial userInfo will always comes from local storage,if there is any
};

const store = configureStore({
  reducer,
  preloadedState,
  devTools: process.env.NODE_ENV !== "production", //=> only show devTools when in production
});

export default store;
