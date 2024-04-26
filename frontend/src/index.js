import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "./css/defaults.css";
import "./css/fonts.css";
import "./css/helpers.css";
import "./css/reset.css";
import "./css/variables.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
