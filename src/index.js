import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import ShopContextProvider from "./context/ShopContext";
import { StateContextProvider } from "./context/StateContext";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import cartReducer from "./constants/slice"

const store = configureStore({
  reducer: {
    cart: cartReducer
  },
});

// Khởi tạo tổng số lượng giỏ hàng ban đầu
// store.dispatch(GET_CART_TOTAL());

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
