import React from "react";
import ReactDOM from "react-dom/client";
import "./bootstrap.min.css"; //export bootstrap format lab
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
