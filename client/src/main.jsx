import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Auth_Context_Provider from "./Contexts/Auth_Context_Provider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth_Context_Provider>
      <App />
    </Auth_Context_Provider>
  </StrictMode>,
);
