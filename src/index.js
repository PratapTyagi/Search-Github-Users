import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ContextProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-plb2oi7x.us.auth0.com"
      clientId="dfNwm0FBMZBsGUNa1qE0n0kyylc4vvGV"
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
    >
      <ContextProvider>
        <App />
      </ContextProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();