import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { IoMdArrowRoundBack } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import Button from "../components/Button";
import Info from "../components/Info";
import { CLEAR_CART } from "../slice/cartSlice";
import numeral from "numeral";

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
        <div className="mt-10 mb-20 flex flex-col xl:flex-row w-full md:w-10/12 mx-auto">
          <div className="w-full xl:w-3/5">
            <table className="w-full">
              <thead className="max-md:hidden">
                <tr className="bg-yellow-50 w-full h-full">
                  <th className="p-3">#</th>
                  <th className="p-3">Image</th>
                  <th className="p-3">Product</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Subtotal</th>
                  <th className="p-3">Delete</th>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index} className="max-md:border max-md:relative">
                    <th className="py-10 w-4 max-md:hidden">{index + 1}</th>
                    <td className="py-10 w-20 max-sm:w-28">
                      <img
                        className="w-full h-20 mx-auto"
                        src={item.images[0].imageLink}
                        alt=""
                      />
                    </td>
                    <td className="py-10 w-32 md:w-36 text-sm md:text-base">
                      <div>{item.productName}</div>
                      <div
                        style={{ backgroundColor: item.color[1] }}
                        className="w-7 h-7 rounded-full mx-auto border-2 border-gray my-1"
                      ></div>
                      <div>{item.size[1]}</div>
                    </td>
                    <td className="py-10 w-32 md:w-36 text-sm md:text-base">
                      <p
                        className={`${
                          item.sale !== null ? "line-through" : null
                        }`}
                      >
                        {numeral(item.price).format("0,0")}đ
                      </p>
                      {item.sale !== null ? (
                        <p className="text-red-600">
                          {numeral(
                            item.price - (item.price * item.sale) / 100
                          ).format("0,0")}
                          đ
                        </p>
                      ) : null}
                    </td>
                    <td className="py-10 max-sm:pr-2 w-10">
                      <div className="flex justify-center items-center rounded-md border-2 w-16 mx-auto text-sm">
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
                    <td className="py-10 w-36 max-md:hidden">
                      {item.sale !== null ? (
                        <p>
                          {numeral(
                            item.cartQuantity *
                              (item.price - (item.price * item.sale) / 100)
                          ).format("0,0")}
                          đ
                        </p>
                      ) : (
                        <p>
                          {numeral(
                            item.cartQuantity * (item.price)
                          ).format("0,0")}
                          đ
                        </p>
                      )}
                    </td>
                    <td className="w-4 px-1 max-sm:absolute max-sm:top-2 max-sm:right-3">
                      <FaTrashAlt
                        onClick={() => {
                          handleRemoveItem(item, index);
                        }}
                        className="text-yellow-600 cursor-pointer mx-auto"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-end my-4">
              <Button
                title="Clear"
                className="border-2 border-black px-6 py-1 md:px-8 md:py-2 rounded-lg
               hover:border-yellow-700 hover:bg-yellow-700 hover:text-white
               active:bg-yellow-700 active:border-yellow-700 text-sm md:text-base"
                onClick={() => handleClear()}
              ></Button>
            </div>
          </div>

          <div className="w-full xl:w-2/5">
            <div className="w-9/12 bg-yellow-50 mx-auto pt-6 pb-10">
              <h1 className="font-semibold text-2xl pb-10">Cart Totals</h1>
              <div className="py-5 flex w-2/3 lg:w-1/2 mx-auto justify-between items-center">
                <span className="font-semibold text-sm md:text-base">
                  Subtotal
                </span>
                <span className="text-sm text-gray-400">
                  {numeral(cart.cartTotalCost).format("0,0")}đ
                </span>
              </div>
              <div className="py-5 flex w-2/3 lg:w-1/2 mx-auto justify-between items-center">
                <span className="font-semibold text-sm md:text-base">
                  Total
                </span>
                <span className="text-yellow-600 text-md md:text-lg">
                  {numeral(cart.cartTotalCost).format("0,0")}đ
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
