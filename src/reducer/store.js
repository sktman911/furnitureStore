import cartReducer from "./cartSlice"
import userReducer from "./userSlice"
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer: {
      cart: cartReducer,
      user : userReducer
    },
  });

export default store; 
  