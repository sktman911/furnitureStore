import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { orderAPI, orderDetailAPI } from "../modules/apiClient";
import { format, parseISO } from "date-fns";
import numeral from "numeral";
import Stepper from "../components/Stepper";
import {Link} from "react-router-dom"

export default function OrderDetail() {
  const { orderId } = useParams();
  const [orderDetail, setOrderDetail] = useState([]);
  const [order, setOrder] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // order status
  const [currentStep, setCurrentStep] = useState(null);
  const titles = useMemo(() => ["Waiting for confirm", "On delivery", "Delivered"],[]);

  const hanldeOrderStatus = useCallback((statusName) => {
    const index = titles.findIndex((item) => item === statusName);
    if (index !== -1) {
      setCurrentStep(index);
    }
  },[titles]);

  useEffect(() => {
    const getOrder = (async () => {
      await orderAPI()
        .GET_ID(orderId)
        .then((res) => {
          setOrder(res.data);
          hanldeOrderStatus(res.data.orderStatusName);
        })
        .catch((err) => console.log(err));
    });

    const getOrderDetail = async () => {
      await orderDetailAPI()
        .GET(orderId)
        .then((res) => {
          setOrderDetail(res.data);
        })
        .catch((err) => console.log(err));
    };

    getOrder();
    getOrderDetail();
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      navigate(`/history?page=${location.state.fromPage}`, { replace: true });
    };

    // window.onpopstate = () => {
    //   if(location.state){
    //     navigate(`/history?page=${location.state.fromPage}`)
    //   }
    // }

    window.addEventListener('onpopstate', handlePopState);

    return () => {
      window.removeEventListener('onpopstate', handlePopState);
    };
  },[navigate,location.state.fromPage])

  return orderDetail && order && order.orderDate ? (
    <div className="mt-24">
      <div className="w-4/5 py-5 shadow-2xl rounded-md mx-auto bg-yellow-50 mt-32 mb-8">
        <h2 className=" text-2xl font-bold mb-4">Order</h2>
        <div className="flex justify-between w-10/12 mx-auto text-start">
          <div className="w-4/6">
            <span>Order ID: </span>
            <span>{orderId}</span>
          </div>
          <div className="w-2/6">
            <span>Order Date: </span>
            <span>
              {format(parseISO(order.orderDate), "dd-MM-yyyy HH:mm:ss")}
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
            {orderDetail.map((item, index) => (
              <tr key={index}>
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{item.productName}</td>
                <td className="p-2">{item.sizeName}</td>
                <td className="p-2">{item.colorName}</td>
                <td className="p-2">
                  {numeral(item.price).format("0,0")} <u>đ</u> 
                </td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">
                  {numeral(item.quantity * item.price).format("0,0")} đ
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 text-end w-11/12 text-lg">
          <span className="font-semibold">Total: </span>
          <span>{numeral(order.totalPrice).format("0,0.000")} đ</span>
        </div>

        <div className="text-start w-5/6 mx-auto">
          <span>Order Status: {order.orderStatusName}</span>
        </div>

        <Stepper
          currentStep={currentStep}
          steps={titles.length}
          titles={titles}
        />

        <div className="my-6 flex justify-center">
          <Link
            to={`/history?page=${location.state ? location.state.fromPage : 1}`}
            state={ { fromPage: location.state ? location.state.fromPage : 1}}
            className="w-24 py-2 bg-slate-800 text-white rounded-md"
            replace={true}
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="mx-auto w-1/2">Loading</div>
  );
}
