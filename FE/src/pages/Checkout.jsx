import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Button from "../components/Button";
import Info from "../components/Info";
import { useSelector, useDispatch } from "react-redux";
import { customerAPI, orderAPI } from "../modules/apiClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { errorMessage } from "../constants/message";
import { CLEAR_CART } from "../slice/cartSlice";
import numeral from "numeral";

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [shipFee, setShipFee] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const loadInfo = () => {
      if (user != null && !user.role) {
        customerAPI()
          .GET_ID(user.cusId)
          .then((res) => setInfo(res.data))
          .catch((err) => console.log(err));
      }
    };
    loadInfo();
    const setInfo = (user) => {
      if (user != null) {
        setValue("cusName", user.cusName);
        setValue("cusPhone", user.cusPhone);
        setValue("cusEmail", user.email);
        setValue("cusAddress", user.cusAddress);
      }
    };

    if (cart.cartTotalCost > 0) {
      // setShipFee(20);
      setTotal(shipFee + cart.cartTotalCost);
    } else {
      // setShipFee(0);
      setTotal(0);
    }
  }, []);

  const onCheckout = async(data) => {
    if (user === null) {
      navigate("/login", { replace: true });
      return;
    }

    if (paymentMethod === null) {
      errorMessage("Please choose payment method!");
      return;
    }

    if (cart.cartItems.length === 0) {
      errorMessage("Your cart is empty");
      return;
    }

    const pscList = [];

    for (var item of cart.cartItems) {
      const detail = {
        productId: item.productId,
        quantity: item.cartQuantity,
        colorId: item.color[0],
        sizeId: item.size[0],
        unitPrice: item.price,
      };
      pscList.push(detail);
    }

    const formData = {
      totalPrice: total,
      totalQuantity: cart.cartTotalQuantity,
      omId: paymentMethod,
      cusId: user.cusId,
      orderAddress: data.cusAddress,
      orderPhone: data.cusPhone,
      note: data.cusNote,
      pscList: pscList,
    };

    await orderAPI()
      .POST(formData)
      .then((res) => {
        if (res.data.type === "Bank") {
          window.location.href = res.data.url;
        } else if (res.data.status === true && res.data.type === "Cash") {
          navigate(res.data.url, { replace: true });
        } else {
          errorMessage(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err, {
          position: "top-center",
          autoClose: 1500,
          theme: "colored",
        });
      });

      dispatch(CLEAR_CART());
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

      <div className="flex flex-col lg:flex-row w-4/5 mx-auto max-h-max">
        <div className="w-full lg:w-1/2">
          <h2 className="font-semibold text-xl text-center lg:text-left">
            Billing details
          </h2>
          <form className="py-8" onSubmit={handleSubmit(onCheckout)}>
            <div className="grid grid-cols-2 text-center lg:text-left">
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

            <div className="text-center lg:text-left">
              <div className="py-2">
                <label className="my-2 block">Your Email: </label>
                <input
                  type="email"
                  className="py-2 px-6 border-2 rounded-md w-11/12"
                  {...register("cusEmail", { required: "Please fill email" })}
                />
                {errors.cusEmail && (
                  <p className=" text-red-600 text-left mx-auto">
                    {errors.cusEmail.message}
                  </p>
                )}
              </div>
            </div>

            <div className="text-center lg:text-left">
              <div className="py-2">
                <label className="my-2 block">Your Address: </label>
                <input
                  type="text"
                  className="py-2 px-6 border-2 rounded-md w-11/12"
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

            <div className="text-center lg:text-left">
              <div className="py-2">
                <label className="my-2 block">Note: </label>
                <textarea
                  rows="6.5"
                  className="py-2 px-6 border-2 rounded-md w-11/12 resize-none"
                  {...register("cusNote", { required: false })}
                  placeholder="Note something for order"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="w-full lg:w-1/2 lg:pl-12 xl:pl-20 max-h-max mb-8">
          <div className="flex flex-col gap-4 border-b-2 py-8 px-3 bg-yellow-50 rounded-t-lg">
            <div className="text-md md:text-lg font-semibold flex justify-between">
              <span>Product</span>
              <span>Subtotal</span>
            </div>
            {cart.cartItems.map((item, index) => (
              <div
                className="flex justify-between items-end text-sm md:text-base"
                key={index}
              >
                <div>
                  <span className="text-gray-400">{item.productName}</span>
                  <span> x {item.cartQuantity}</span>
                </div>
                {item.sale !== null ? (
                  <p>
                    {numeral(item.cartQuantity * (item.price - (item.price * item.sale /100))).format("0,0")} đ
                  </p>
                ) : (
                  <p>
                    {numeral(item.cartQuantity * item.price).format("0,0")} đ
                  </p>
                )}
              </div>
            ))}

            {/* Shipping fee */}
            {/* <div className="flex justify-between items-end">
              <div>
                <span>Shipping</span>
              </div>
              <p>{numeral(shipFee).format("0,0")} đ</p>
            </div> */}
            <div className="flex justify-between items-end ">
              <div>
                <span>Total</span>
              </div>
              <p className="text-yellow-600 text-lg md:text-xl font-semibold">
                {numeral(total).format("0,0")} đ
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-col gap-4 px-3 bg-yellow-50 rounded-b-lg">
            <div>
              <div className="flex items-center gap-5">
                <input
                  type="radio"
                  name="payment"
                  onChange={() => setPaymentMethod(2)}
                />
                <label className="text-sm">Vnpay payment</label>
              </div>
              <p className="text-sm text-left text-gray-400 leading-6 py-2">
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order will not be
                shipped until the funds have cleared in our account.
              </p>
            </div>

            <div className="flex items-center gap-5">
              <input
                type="radio"
                name="payment"
                onChange={() => setPaymentMethod(1)}
              />
              <label className="text-sm">Momo payment</label>
            </div>

            <div className="text-sm text-left leading-6">
              <p>
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our {""}
                <span className="font-bold">privacy policy</span>.
              </p>
            </div>

            <div className="flex items-center gap-5">
              <input
                type="radio"
                name="payment"
                onChange={() => setPaymentMethod(1)}
              />
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
