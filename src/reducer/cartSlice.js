import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { successMessage } from "../constants/message";

const initialState = {
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  cartTotalQuantity: 0,
  cartTotalCost: 0,
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      // If item exists => update item quantity else => add new item
      const index = state.cartItems.findIndex(
        (item) => item.productId === action.payload.product.productId
      );
      if (index >= 0) {
        // check if exist color and size exist
        if (!checkExisted(state, action)) {
          const temp = {
            ...action.payload.product,
            cartQuantity: action.payload.quantity,
            size: action.payload.size,
            color: action.payload.color,
          };
          state.cartItems.push(temp);
        }
      } else {
        const temp = {
          ...action.payload.product,
          cartQuantity: action.payload.quantity,
          size: action.payload.size,
          color: action.payload.color,
        };
        state.cartItems.push(temp);
      }

      successMessage(`Add ${action.payload.product.productName} successfully`)
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    REMOVE_ITEM(state, action) {
      // select products diff from the delete
      const newCartItems = state.cartItems.filter(
        (item, index) => index !== action.payload.index
      );

      state.cartItems = newCartItems;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      toast.success(`Remove ${action.payload.item.productName} successfully`, {
        position: "top-center",
        autoClose: 1500,
        theme: "colored",
      });
    },

    DECREASE_ITEM(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item, index) => index === action.payload.index
      );

      if (state.cartItems[itemIndex].cartQuantity > 1)
        state.cartItems[itemIndex].cartQuantity -= 1;
      else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const newCartItems = state.cartItems.filter(
          (item, index) => index !== action.payload.index
        );

        state.cartItems = newCartItems;

        successMessage(`Remove ${action.payload.item.productName} successfully`)
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    INCREASE_ITEM(state, action) {
      const index = state.cartItems.findIndex(
        (item, index) => index === action.payload.index
      );
      if (index >= 0) {
        state.cartItems[index].cartQuantity += 1;
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    CLEAR_CART(state, action) {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    GET_CART_TOTAL(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const totalCost = price * cartQuantity;

          cartTotal.total += totalCost;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartTotalCost = total;
      state.cartTotalQuantity = quantity;
    },
  },
});


// check exist func
const checkExisted = (state, action) => {
  const existedBoth = state.cartItems.findIndex(
    (item) =>
      item.color[0] === action.payload.color[0] &&
      item.size[0] === action.payload.size[0]
  );

  if (existedBoth >= 0) {
    state.cartItems[existedBoth].cartQuantity += action.payload.quantity;
    return true;
  }

  return false;
};

export const {
  ADD_TO_CART,
  REMOVE_ITEM,
  DECREASE_ITEM,
  INCREASE_ITEM,
  CLEAR_CART,
  GET_CART_TOTAL,
} = slice.actions;

export default slice.reducer;
