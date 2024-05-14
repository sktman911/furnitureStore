import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";

import { REMOVE_ITEM } from "../constants/cartSlice";

import { IoMdClose } from "react-icons/io";
import { MdCancel } from "react-icons/md";

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeItem = (item, index) => {
    dispatch(    {
      type: "cart/REMOVE_ITEM",
      payload: { item, index },
    });
  };

  return (
    <>
      {props.open === true ? (
        <div className="z-30 bg-white fixed w-96 h-screen top-0 right-0 shadow-lg overflow-y-auto">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="font-bold text-xl py-8 border-b-2 w-96 text-left">
              Shopping Cart
            </h1>
            <span className="w-1/4 flex justify-end">
              <IoMdClose
                className="text-xl cursor-pointer"
                onClick={(e) => {
                  props.setOpen(false);
                }}
              />
            </span>
          </div>

          {cart.cartItems.length === 0 ? (
            <div>
              <p className="text-xl py-5 text-yellow-600 font-semibold">
                No items in cart
              </p>
            </div>
          ) : (
            <>
              {cart.cartItems.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center p-6 justify-between">
                    <img
                      className="w-28 h-28 rounded-md"
                      src={item.images[0].imageLink}
                      alt=""
                    />
                    <div className="flex flex-col gap-1 w-1/2 pl-2">
                      <h2 className="text-left">{item.productName}</h2>
                      <h2 className="text-left">Size: {item.size[1]}</h2>
                      <div>
                      <h2 className="text-left flex items-center gap-2">
                        Color:
                        <div
                          style={{backgroundColor: item.color[1] }}
                          className="w-7 h-7 rounded-full  border-2 border-gray"
                        ></div>
                      </h2>
                      </div>
                      <div className="flex items-end gap-6">
                        <p>{item.cartQuantity}</p>
                        <span>x</span>
                        <span className="text-yellow-600 text-sm">
                          $ {item.price}
                        </span>
                      </div>
                    </div>
                    <MdCancel
                      onClick={() => {removeItem(item, index)}}
                      className="text-gray-400 text-xl cursor-pointer"
                    />
                  </div>
                </div>
              ))}

              <div className="py-8">
                <div className="flex px-6 pb-5 justify-between border-b-2">
                  <p>Subtotal:</p>
                  <p className="text-yellow-600 font-semibold">
                    $ {cart.cartTotalCost}
                  </p>
                </div>
                <div className="text-xs p-6 flex justify-between">
                  <Button
                    link="/cart"
                    title="Cart"
                    className={
                      "px-6 py-1.5 border border-black rounded-full hover:bg-slate-900 hover:text-white active:bg-slate-800"
                    }
                    onClick={() => {
                      window.scroll(0, 0);
                    }}
                  />
                  <Button
                    link="/checkout"
                    title="Checkout"
                    className={
                      "px-6 py-1.5 border border-black rounded-full hover:bg-slate-900 hover:text-white active:bg-slate-800"
                    }
                    onClick={() => {
                      window.scroll(0, 0);
                    }}
                  />
                  <Button
                    title="Comparison"
                    className={
                      "px-6 py-1.5 border border-black rounded-full hover:bg-slate-900 hover:text-white active:bg-slate-800"
                    }
                  />
                </div>
              </div>
            </>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Cart;
