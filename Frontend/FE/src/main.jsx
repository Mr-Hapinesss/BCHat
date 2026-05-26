import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Global reset
const globalStyle = document.createElement("style");
globalStyle.textContent = `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #0a0e1a; }`;
document.head.appendChild(globalStyle);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);