import React from "react";
import { Container } from "react-bootstrap";
import Hearder from "./components/Hearder";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import VillaScreen from "./screens/ProductScreens/VillaScreen";
import FoodScreen from "./screens/ProductScreens/FoodScreen";
import SpecialtyScreen from "./screens/ProductScreens/SpecialtyScreen";
import TravelScreen from "./screens/ProductScreens/TravelScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Hearder />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/villa/:id" element={<VillaScreen />} />
              <Route path="/food/:id" element={<FoodScreen />} />
              <Route path="/specialty/:id" element={<SpecialtyScreen />} />
              <Route path="/travel/:id" element={<TravelScreen />} />
              <Route path="/cart">
                <Route path=":id" element={<CartScreen />} />
                <Route path="" element={<CartScreen />} />
              </Route>
              <Route path="/login" element={<LoginScreen />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
};

export default App;
