import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { SWRConfig } from "swr";
import App from "./App";
// import localStorageProvider from "./localStorageProvider.js";

// Bootstrap CSS
// import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="397119257310-cgbc31mvn72tpnbf4j8h06h72a9985vi.apps.googleusercontent.com">
      {/* <SWRConfig value={{ provider: localStorageProvider }}> */}
      <App />
      {/* </SWRConfig> */}
    </GoogleOAuthProvider>
  </React.StrictMode>
);
