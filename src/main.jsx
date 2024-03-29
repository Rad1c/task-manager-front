import { ThemeProvider } from "@lanaco/lnc-react-ui";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./localization/i18n";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
