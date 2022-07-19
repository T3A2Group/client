import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/CartConstants";

//we can get category,id,qty from URL
export const addToCart = (category, id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/${category}/${id}`);
  // console.log(data);
  //   const { foodData } = await axios.get(`/api/food/${id}`);
  //   const { specialtyData } = await axios.get(`/api/specialties/${id}`);
  //   const { travelData } = await axios.get(`/api/travel/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      //this is what we want to display in cart component
      product: data._id,
      name: data.name,
      category: data.category,
      image: data.image[0],
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
