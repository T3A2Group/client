import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import VillaScreen from "./screens/ProductScreens/VillaScreen";
import FoodScreen from "./screens/ProductScreens/FoodScreen";
import SpecialtyScreen from "./screens/ProductScreens/SpecialtyScreen";
import TravelScreen from "./screens/ProductScreens/TravelScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import VillaListScreen from "./screens/ProductScreens/VillaListScreen";
import FoodListScreen from "./screens/ProductScreens/FoodListScreen";
import SpecialtyListScreen from "./screens/ProductScreens/SpecialtyListScreen";
import TravelListScreen from "./screens/ProductScreens/TravelListScreen";
import AdminVillaListScreen from "./screens/AdminProductListScreens/AdminVillaListScreen";
import AdminFoodListScreen from "./screens/AdminProductListScreens/AdminFoodListScreen";
import AdminSpecialtyListScreen from "./screens/AdminProductListScreens/AdminSpecialtyListScreen";
import AdminTravelListScreen from "./screens/AdminProductListScreens/AdminTravelListScreen";
import VillaEditScreen from "./screens/ProductsEditScreens/VillaEditScreen";
import FoodEditScreen from "./screens/ProductsEditScreens/FoodEditScreen";
import SpecialtyEditScreen from "./screens/ProductsEditScreens/SpecialtyScreen";
import TravelEditScreen from "./screens/ProductsEditScreens/TravelEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
// import react-helmet-async to fix console error
import { HelmetProvider } from "react-helmet-async";
//toastify lab import start
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//toastify lab import end
//import react-paypal-js and axios for payment
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import backend from "./utils/setBaseUrl";

const App = () => {
  const [clientID, setClientID] = useState("");

  useEffect(() => {
    const getClientId = async () => {
      const { data: clientId } = await backend.get("/api/config/paypal");
      setClientID(clientId);
    };
    if (!window.paypal) {
      getClientId();
    }
  }, []);

  return (
    <>
      <HelmetProvider>
        {clientID && (
          <PayPalScriptProvider options={{ "client-id": clientID }}>
            <Router>
              <Header />

              <main className="py-3">
                <Container>
                  <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/villa" element={<VillaListScreen />} />
                    <Route path="/villa/:id" element={<VillaScreen />} />
                    <Route path="/food" element={<FoodListScreen />} />
                    <Route path="/food/:id" element={<FoodScreen />} />
                    <Route
                      path="/specialty"
                      element={<SpecialtyListScreen />}
                    />
                    <Route
                      path="/specialty/:id"
                      element={<SpecialtyScreen />}
                    />
                    <Route path="/travel" element={<TravelListScreen />} />
                    <Route path="/travel/:id" element={<TravelScreen />} />
                    <Route path="/cart">
                      <Route path=":id" element={<CartScreen />} />
                      <Route path="" element={<CartScreen />} />
                    </Route>
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/register" element={<RegisterScreen />} />
                    <Route path="/profile" element={<ProfileScreen />} />
                    <Route path="/shipping" element={<ShippingScreen />} />
                    <Route path="/payment" element={<PaymentScreen />} />
                    <Route path="/placeorder" element={<PlaceOrderScreen />} />
                    <Route path="/order/:id" element={<OrderScreen />} />
                    <Route
                      path="/admin/userlist"
                      element={<UserListScreen />}
                    />
                    <Route
                      path="/admin/user/:id/edit"
                      element={<UserEditScreen />}
                    />
                    <Route
                      path="/admin/productlist/villa"
                      element={<AdminVillaListScreen />}
                    />
                    <Route
                      path="/admin/productlist/food"
                      element={<AdminFoodListScreen />}
                    />
                    <Route
                      path="/admin/productlist/specialty"
                      element={<AdminSpecialtyListScreen />}
                    />
                    <Route
                      path="/admin/productlist/travel"
                      element={<AdminTravelListScreen />}
                    />
                    <Route
                      path="/admin/orderlist"
                      element={<OrderListScreen />}
                    />
                    <Route
                      path="/admin/villa/:id/edit"
                      element={<VillaEditScreen />}
                    />
                    <Route
                      path="/admin/food/:id/edit"
                      element={<FoodEditScreen />}
                    />
                    <Route
                      path="/admin/specialty/:id/edit"
                      element={<SpecialtyEditScreen />}
                    />
                    <Route
                      path="/admin/travel/:id/edit"
                      element={<TravelEditScreen />}
                    />
                    <Route
                      path="/search/villa/:keyword"
                      element={<VillaListScreen />}
                    />
                    <Route
                      path="/search/food/:keyword"
                      element={<FoodListScreen />}
                    />
                    <Route
                      path="/search/specialty/:keyword"
                      element={<SpecialtyListScreen />}
                    />
                    <Route
                      path="/search/travel/:keyword"
                      element={<TravelListScreen />}
                    />
                  </Routes>
                </Container>
              </main>
              <Footer />
              <ToastContainer />
            </Router>
          </PayPalScriptProvider>
        )}
      </HelmetProvider>
    </>
  );
};

export default App;
