import cartSlice from "./cartSlice";
import userSlice from "./userSlice";
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer: {
      cart: cartSlice,
      user : userSlice,
    },
  });

export default store; 
  