import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { orderAPI } from "../modules/api/api";
import { IoArrowBackOutline } from "react-icons/io5";
import Stepper from "../../components/OrderDetail/Stepper";

export default function OrderDetail() {
  const { orderId } = useParams();
  const [order, setOrder] = useState([]);

  // order status
  const [currentStep, setCurrentStep] = useState(null);
  const titles = ["Waiting for confirm", "On delivery", "Delivered"];

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async () => {
    await orderAPI()
      .GET_ID(orderId)
      .then((res) => {
        setOrder(res.data);
        hanldeOrderStatus(res.data.orderStatusName);
      })
      .catch((err) => console.log(err));
  };

  const hanldeOrderStatus = (statusName) => {
    const index = titles.findIndex((item) => item === statusName);
    if (index !== -1) {
      setCurrentStep(index);
    }
  };

  const updateOrderStatus = () => {
    orderAPI()
      .PUT(order.orderId, order)
      .then((res) => {setOrder(res.data);hanldeOrderStatus(res.data.orderStatusName);})
      .catch((err) => console.log(err));
  };

  return order && order.orderDate ? (
    <div className="pt-12">
      <div className="my-6 text-left w-4/5 mx-auto ">
        <Link
          to={"/admin/orders"}
          className="w-24 bg-slate-800 text-white py-2 px-4 rounded-md flex items-center justify-around"
        >
          <IoArrowBackOutline /> <span>Back</span>
        </Link>
      </div>

      <div className="w-4/5 py-5 shadow-2xl rounded-md mx-auto bg-yellow-50">
        <h2 className=" text-2xl font-bold mb-4">Order</h2>
        <div className="flex justify-between w-10/12 mx-auto text-start">
          <div className="w-4/6">
            <span>Order ID: </span>
            <span>{orderId}</span>
          </div>
          <div className="w-2/6">
            <span>Order Date: </span>
            <span>
              {Intl.DateTimeFormat('us', {dateStyle: 'long', timeStyle: 'medium'}).format(new Date(order.orderDate))}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-4 w-10/12 mx-auto text-start">
          <div className="w-4/6">
            <span>Total quantity: </span>
            <span>{order.totalQuantity}</span>
          </div>
          <div className="w-2/6">
            <span>Order Method: </span>
            <span>{order.orderMethodName}</span>
          </div>
        </div>

        <table className="py-3 table-auto border-collapse border border-black mx-auto w-5/6">
          <thead>
            <tr className="border border-b border-black">
              <th className="p-2">#</th>
              <th className="p-2">Product Name</th>
              <th className="p-2">Size</th>
              <th className="p-2">Color</th>
              <th className="p-2">Price</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">SubPrice</th>
            </tr>
          </thead>
          <tbody>
            {order.orderDetails.map((item, index) =>{
            const formatPrice = new Intl.NumberFormat('vi-VI', {style:'currency',currency:'VND'}).format(item.unitPrice);
            const formatSubPrice = new Intl.NumberFormat('vi-VI', {style:'currency',currency:'VND'}).format(item.unitPrice * item.quantity);
            return (
              <tr key={index}>
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{item.productSizeColor.product.productName}</td>
                <td className="p-2">{item.productSizeColor.size.sizeName}</td>
                <td className="p-2">{item.productSizeColor.color.colorName}</td>
                <td className="p-2">{formatPrice}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">
                  {formatSubPrice}
                </td>
              </tr>
            )})}
          </tbody>
        </table>

        <div className="mt-4 text-end w-11/12 text-lg">
          <span className="font-semibold">Total: </span>
          <span>{Intl.NumberFormat('vi-VI', {style:'currency',currency:'VND'}).format(order.totalPrice)}</span>
        </div>

        <div className="text-start w-5/6 mx-auto">
          <span>Order Status:</span>
        </div>

        <Stepper
          steps={titles.length}
          currentStep={currentStep}
          titles={titles}
        />

        {currentStep === 0 ? (
          <button
            type="button"
            onClick={updateOrderStatus}
            className="mt-6 px-3 py-2 text-white bg-slate-700 rounded-lg active:bg-slate-800"
          >
            Confirm
          </button>
        ) : null}
      </div>
    </div>
  ) : (
    <div className="mx-auto w-1/2">Loading</div>
  );
}
