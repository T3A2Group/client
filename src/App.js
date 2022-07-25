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
//toastify lab import start
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//toastify lab import end
//import react-paypal-js and axios for payment
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import VillaListScreen from "./screens/ProductScreens/VillaListScreen";
import FoodListScreen from "./screens/ProductScreens/FoodListScreen";
import SpecialtyListScreen from "./screens/ProductScreens/SpecialtyListScreen";
import TravelListScreen from "./screens/ProductScreens/TravelListScreen";

const App = () => {
  const [clientID, setClientID] = useState("");
  useEffect(() => {
    const getClientId = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      setClientID(clientId);
    };
    if (!window.paypal) {
      getClientId();
    }
  }, []);

  return (
    <>
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
                  <Route path="/specialty" element={<SpecialtyListScreen />} />
                  <Route path="/specialty/:id" element={<SpecialtyScreen />} />
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
                </Routes>
              </Container>
            </main>
            <Footer />
            <ToastContainer />
          </Router>
        </PayPalScriptProvider>
      )}
    </>
  );
};

export default App;
