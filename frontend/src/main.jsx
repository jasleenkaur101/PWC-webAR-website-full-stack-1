import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

// (Optional) global CSS imports
import "./legacy-styles/styles.css";       // your merged CSS file
import "./legacy-styles/business-portal.css";     // if you have a second CSS (else remove)

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
