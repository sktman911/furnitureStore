import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
        state.cartItems[index].cartQuantity += action.payload.quantity;
      } else {
        const temp = { ...action.payload.product, cartQuantity: action.payload.quantity };
        state.cartItems.push(temp);
      }
      toast.success(`Add ${action.payload.product.productName} successfully`, {
        position: "top-center",
        autoClose: 1500,
        theme: "colored",
      });

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    REMOVE_ITEM(state, action) {
      const newCartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload.productId
      );

      state.cartItems = newCartItems;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      toast.success(`Remove ${action.payload.productName} successfully`, {
        position: "top-center",
        autoClose: 1500,
        theme: "colored",
      });
    },
    DECREASE_ITEM(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (state.cartItems[itemIndex].cartQuantity > 1)
        state.cartItems[itemIndex].cartQuantity -= 1;
      else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const newCartItems = state.cartItems.filter(
          (item) => item.productId !== action.payload.productId
        );

        state.cartItems = newCartItems;
        toast.success(`Remove ${action.payload.productName} successfully`, {
          position: "top-center",
          autoClose: 1500,
          theme: "colored",
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    INCREASE_ITEM(state, action) {
      const index = state.cartItems.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (index >= 0) {
        state.cartItems[index].cartQuantity += 1;
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    CLEAR_CART(state, action) {
      state.cartItems = [];
      toast.success(`Clear cart successfully`, {
        position: "top-center",
        autoClose: 1500,
        theme: "colored",
      });

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    GET_CART_TOTAL(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
            const {price, cartQuantity} = cartItem;
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

export const {
  ADD_TO_CART,
  REMOVE_ITEM,
  DECREASE_ITEM,
  INCREASE_ITEM,
  CLEAR_CART,
  GET_CART_TOTAL
} = slice.actions;

export default slice.reducer;
