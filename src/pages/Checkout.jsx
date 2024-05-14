import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Button from "../components/Button";
import Info from "../components/Info";
import { useSelector, useDispatch } from "react-redux";
import { customerAPI, orderAPI } from "../modules/apiClient";
import { CLEAR_CART } from "../constants/cartSlice";
import { toast } from "react-toastify";

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [shipFee, setShipFee] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadInfo();
    if (cart.cartTotalCost > 0) {
      setShipFee(20);
      setTotal(shipFee + cart.cartTotalCost);
    } else {
      setShipFee(0);
      setTotal(0);
    }
  }, [cart.cartTotalQuantity]);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const setInfo = (user) => {
    if (user != null) {
      setValue("cusName", user.cusName);
      setValue("cusPhone", user.cusPhone);
      setValue("cusEmail", user.email);
      setValue("cusAddress", user.cusAddress);
    }
  };

  const loadInfo = () => {
    if (user != null) {
      customerAPI()
        .GET_ID(user.cusId)
        .then((res) => setInfo(res.data))
        .catch((err) => console.log(err));
    }
  };

  const onCheckout = async () => {
    if (user == null) {
      return;
    }

    if (cart == null) {
      return;
    }

    const pscList = [];

    for (var item of cart.cartItems) {
      const detail = {
        productId: item.productId,
        quantity: item.cartQuantity,
        colorId: item.color[0],
        sizeId: item.size[0],
      };
      pscList.push(detail);
    }

    const data = {
      totalPrice: total,
      totalQuantity: cart.cartTotalQuantity,
      omId: 1,
      cusId: user.cusId,
      pscList: pscList,
    };

    await orderAPI()
      .POST(data)
      .then((res) => {
        dispatch(CLEAR_CART());
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 1500,
          theme: "colored",
        });
      })
      .catch((err) =>{
        const message = err.response.data.message;
        toast.error(message, {
          position: "top-center",
          autoClose: 1500,
          theme: "colored",
        })
      }
      );
  };

  return (
    <div className="mt-24">
      <div className="py-10">
        <h1 className="py-5 font-bold text-3xl">Checkout</h1>
        <span className="uppercase">
          <span className="font-bold">Home</span>
          <span className="mx-2">&gt;</span>
          <span className="font-normal">Checkout</span>
        </span>
      </div>

      <div className="flex w-4/5 mx-auto max-h-max">
        <div className="w-1/2">
          <h2 className="font-semibold text-xl text-left">Billing details</h2>
          <form className="py-8" onSubmit={handleSubmit(onCheckout)}>
            <div className="flex gap-6 text-left">
              <div className="py-2">
                <label className="my-2 block">Your name: </label>
                <input
                  type="text"
                  className="py-2 px-6 border-2 rounded-md w-5/6"
                  {...register("cusName", { required: "Please fill name" })}
                />
                {errors.cusName && (
                  <p className=" text-red-600 text-left mx-auto">
                    {errors.cusName.message}
                  </p>
                )}
              </div>
              <div className="py-2">
                <label className="my-2 block">Your Phone: </label>
                <input
                  type="text"
                  className="py-2 px-6 border-2 rounded-md w-5/6"
                  {...register("cusPhone", {
                    required: "Please fill phone number",
                    minLength: {
                      value: 10,
                      message: "Length must be longer than 9",
                    },
                    maxLength: {
                      value: 11,
                      message: "Length can't be longer than 11",
                    },
                    validate: (value) =>
                      !isNaN(value) || "Invalid phone number",
                  })}
                />
                {errors.cusPhone && (
                  <p className=" text-red-600 text-left mx-auto">
                    {errors.cusPhone.message}
                  </p>
                )}
              </div>
            </div>
            <div className="text-left">
              <div className="py-2">
                <label className="my-2 block">Your Email: </label>
                <input
                  type="email"
                  className="py-2 px-6 border-2 rounded-md w-10/12"
                  {...register("cusEmail", { required: "Please fill email" })}
                />
                {errors.cusEmail && (
                  <p className=" text-red-600 text-left mx-auto">
                    {errors.cusEmail.message}
                  </p>
                )}
              </div>
            </div>
            <div className="text-left">
              <div className="py-2">
                <label className="my-2 block">Your Address: </label>
                <input
                  type="text"
                  className="py-2 px-6 border-2 rounded-md w-10/12"
                  {...register("cusAddress", {
                    required: "Please fill address",
                  })}
                />
                {errors.cusAddress && (
                  <p className=" text-red-600 text-left mx-auto">
                    {errors.cusAddress.message}
                  </p>
                )}
              </div>
            </div>
            <div className="text-left">
              <div className="py-2">
                <label className="my-2 block">Note: </label>
                <textarea
                  rows="6.5"
                  className="py-2 px-6 border-2 rounded-md w-10/12 resize-none"
                  {...register("cusNote", { required: false })}
                  placeholder="Note something for order"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="w-1/2 pl-20 max-h-max">
          <div className="flex flex-col gap-4 border-b-2 py-8 px-3 bg-yellow-50 rounded-t-lg">
            <div className="text-lg font-semibold flex justify-between">
              <span>Product</span>
              <span>Subtotal</span>
            </div>
            {cart.cartItems.map((item, index) => (
              <div className="flex justify-between items-end" key={index}>
                <div>
                  <span className="text-gray-400">{item.productName}</span>
                  <span> x {item.cartQuantity}</span>
                </div>
                <p>$ {item.cartQuantity * item.price}</p>
              </div>
            ))}
            <div className="flex justify-between items-end">
              <div>
                <span>Shipping</span>
              </div>
              <p>$ {shipFee}</p>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <span>Total</span>
              </div>
              <p className="text-yellow-600 text-xl font-semibold">${total}</p>
            </div>
          </div>

          <div className="pt-8 flex flex-col gap-4 px-3 bg-yellow-50 rounded-b-lg">
            <div>
              <div className="flex items-center gap-5">
                <input type="radio" name="payment" />
                <label className="text-sm">Direct Bank Transfer</label>
              </div>
              <p className="text-sm text-left text-gray-400 leading-6 py-2">
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order will not be
                shipped until the funds have cleared in our account.
              </p>
            </div>
            <div className="flex items-center gap-5">
              <input type="radio" name="payment" />
              <label className="text-sm">Cash On Delivery</label>
            </div>

            <div className="text-sm text-left leading-6">
              <p>
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our {""}
                <span className="font-bold">privacy policy</span>.
              </p>
            </div>

            <Button
              onClick={handleSubmit(onCheckout)}
              type="button"
              title="Place order"
              className="my-4 py-2 px-16 border border-black rounded-lg hover:bg-slate-900 hover:text-white"
            />
          </div>
        </div>
      </div>

      <Info />
    </div>
  );
};

export default Checkout;
