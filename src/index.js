import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import ShopContextProvider from "./context/ShopContext";
import { StateContextProvider } from "./context/StateContext";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import cartReducer from "./constants/cartSlice"
import userReducer from "./constants/userSlice"

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user : userReducer
  },
});

// Khởi tạo tổng số lượng giỏ hàng ban đầu

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
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
