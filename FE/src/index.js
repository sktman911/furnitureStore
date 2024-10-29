import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Analytics } from "@vercel/analytics/react"

import ShopContextProvider from "./context/ShopContext";
import { StateContextProvider } from "./context/StateContext";


import { Provider } from "react-redux";
import store from "./slice/store"



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Analytics/>
    <Provider store={store}>
      <ShopContextProvider>
        <StateContextProvider>
          <App />
        </StateContextProvider>       
      </ShopContextProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
