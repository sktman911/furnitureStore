import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { IoMdArrowRoundBack } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import Button from "../components/Button";
import Info from "../components/Info";
import { CLEAR_CART } from "../constants/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(GET_CART_TOTAL());
  // },[cart, dispatch]);

  const handleRemoveItem = (item, index) => {
    dispatch({
      type: "cart/REMOVE_ITEM",
      payload: { item, index },
    });
  };

  const handleIncreaseQuantity = (item, index) => {
    dispatch({
      type: "cart/INCREASE_ITEM",
      payload: { item, index },
    });
  };

  const handleDecreaseQuantity = (item, index) => {
    dispatch({
      type: "cart/DECREASE_ITEM",
      payload: { item, index },
    });
  };

  const handleClear = () => {
    dispatch(CLEAR_CART());
  };

  return (
    <div className="mt-24">
      <div>
        <h1 className="py-5 font-bold text-3xl">Cart</h1>
        <span className="uppercase">
          <span className="font-bold">Home</span>
          <span className="mx-2">&gt;</span>
          <span className="font-normal">Cart</span>
        </span>
      </div>

      {cart.cartItems.length === 0 ? (
        <div className="my-12">
          <p className="text-xl">Your cart is empty</p>
          <Link
            to="/"
            className="flex items-center justify-center my-10 gap-2 hover:text-yellow-600"
          >
            <IoMdArrowRoundBack />
            <span>Go shopping</span>
          </Link>
        </div>
      ) : (
        <div className="mt-10 mb-20 flex w-10/12 mx-auto">
          <div className=" w-3/5">
            <table className="w-full">
              <thead>
                <tr className="bg-yellow-50 w-full h-full">
                  <th className="p-3"></th>
                  <th className="p-3">Image</th>
                  <th className="p-3">Product</th>
                  <th className="p-3">Color</th>
                  <th className="p-3">Size</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Subtotal</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <th className="py-10 px-3">{index + 1}</th>
                    <td className="py-10 px-3">
                      <img
                        className=" w-28 h-24 mx-auto"
                        src={item.images[0].imageLink}
                        alt=""
                      />
                    </td>
                    <td className="py-10 px-3">{item.productName}</td>
                    <td className="py-10 px-3">
                      <div
                        style={{ backgroundColor: item.color[1] }}
                        className="w-7 h-7 rounded-full mx-auto border-2 border-gray"
                      ></div>
                    </td>
                    <td className="py-10 px-3">{item.size[1]}</td>
                    <td className="py-10 px-3">$ {item.price}</td>
                    <td className="py-10 px-3">
                      <div className="flex justify-center items-center rounded-md border-2 w-3/4 mx-auto text-sm">
                        <Button
                          className="w-3 h-8"
                          title="-"
                          onClick={() => handleDecreaseQuantity(item, index)}
                        />
                        <input
                          type="text"
                          value={item.cartQuantity}
                          className="w-8 h-8 outline-none text-center"
                        />
                        <Button
                          className="w-3 h-8"
                          title="+"
                          onClick={() => handleIncreaseQuantity(item, index)}
                        />
                      </div>
                    </td>
                    <td className="py-10 px-3">
                      $ {item.cartQuantity * Number(item.price)}
                    </td>
                    <td>
                      <FaTrashAlt
                        onClick={() => {
                          handleRemoveItem(item, index);
                        }}
                        className="text-yellow-600 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-end">
              <Button
                title="Clear"
                className="border-2 border-black px-8 py-2 rounded-lg
               hover:border-yellow-700 hover:bg-yellow-700 hover:text-white
               active:bg-yellow-700 active:border-yellow-700"
                onClick={() => handleClear()}
              ></Button>
            </div>
          </div>

          <div className="w-2/5">
            <div className="w-9/12 bg-yellow-50 mx-auto pt-6 pb-10">
              <h1 className="font-semibold text-2xl pb-10">Cart Totals</h1>
              <div className="py-5 flex w-1/2 mx-auto justify-between">
                <span className="font-semibold">Subtotal</span>
                <span className="text-sm text-gray-400">
                  $ {cart.cartTotalCost}
                </span>
              </div>
              <div className="py-5 flex w-1/2 mx-auto justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-yellow-600 text-lg">
                  ${cart.cartTotalCost}
                </span>
              </div>
              <Button
                className="bg-none border-2 rounded-xl border-black py-2 px-14 my-2"
                title="Checkout"
                link={"/checkout"}
              />
            </div>
          </div>
        </div>
      )}

      <Info />
    </div>
  );
};

export default Cart;
