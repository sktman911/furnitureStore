import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  Suspense,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { orderAPI } from "../modules/apiClient";
import Stepper from "../components/OrderDetail/Stepper";
import * as signalR from "@microsoft/signalr";
import { Link } from "react-router-dom";
import { MdOutlineRateReview } from "react-icons/md";
import { apiUrl } from "../constants";
import { differenceInDays } from "../helper/dayHelper";
import {motion} from "framer-motion";

export default function OrderDetail() {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const ReviewForm = React.lazy(() =>
    import("../components/OrderDetail/ReviewForm")
  );

  const [order, setOrder] = useState({});
  const [isOpen, setIsOpen] = useState({
    state: false,
    productName: "",
    productId: "",
    odId: "",
  });

  // order status
  const [currentStep, setCurrentStep] = useState(null);
  const titles = useMemo(
    () => ["Waiting for confirm", "On delivery", "Delivered"],
    []
  );

  const hanldeOrderStatus = useCallback(
    (statusName) => {
      const index = titles.findIndex((item) => item === statusName);
      if (index !== -1) {
        setCurrentStep(index);
      }
    },
    [titles]
  );

  useEffect(() => {
    // create connection to signalR
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(apiUrl + "orderHub")
      .build();
    // start connection
    connection.start();
    // .then().catch()

    // listen for update status
    connection.on("ReceiveUpdateOrderStatus", (order) => {
      setOrder(order);
      hanldeOrderStatus(order.orderStatusName);
    });

    // disconnect signalR when component unmount
    return () => {
      connection.stop();
    };
  }, []);

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

  useEffect(() => {
    const handlePopState = () => {
      navigate(`/history?page=${location.state.fromPage}`, { replace: true });
    };

    window.addEventListener("onpopstate", handlePopState);

    return () => {
      window.removeEventListener("onpopstate", handlePopState);
    };
  }, [navigate, location.state.fromPage]);

  return order && order.orderDate ? (
    <motion.div className="mt-24" initial={{opacity: 0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration: 0.2}}>
      <div className="w-4/5 py-5 shadow-2xl rounded-sm mx-auto border-2 border-gray-200 mt-32 mb-8">
        <h2 className=" text-2xl font-bold mb-4">Order</h2>
        <div className="flex justify-between w-10/12 mx-auto text-start">
          <div className="w-4/6">
            <span>Order ID: </span>
            <span>{orderId}</span>
          </div>
          <div className="w-2/6">
            <span>Order Date: </span>
            <span>
              {Intl.DateTimeFormat('us', {dateStyle: 'long',timeStyle: 'medium'}).format(new Date(order.orderDate))}
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
              <th className="p-2">Review</th>
            </tr>
          </thead>
          <tbody>
            {order.orderDetails.map((item, index) => {
              const formatPrice = new Intl.NumberFormat('vi-VI',{style:'currency',currency: 'VND',}).format(item.unitPrice);
              const formatSubPrice = new Intl.NumberFormat('vi-VI',{style:'currency',currency: 'VND',}).format(item.unitPrice * item.quantity);
              return (
                <tr key={index}>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">
                    {item.productSizeColor.product.productName}
                  </td>
                  <td className="p-2">{item.productSizeColor.size.sizeName}</td>
                  <td className="p-2">
                    {item.productSizeColor.color.colorName}
                  </td>
                  <td className="p-2">
                    {formatPrice}
                  </td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">
                    {formatSubPrice}
                  </td>
                  {item.reviewStatus === null &&
                  differenceInDays(new Date(order.orderDate), new Date()) <=
                    14 ? (
                    <td className="p-2">
                      <div className="w-10 h-10 hover:rounded-full hover:bg-gray-200 cursor-pointer mx-auto">
                        <MdOutlineRateReview
                          size={36}
                          className="mx-auto p-2 pb-1"
                          onClick={() =>
                            setIsOpen({
                              state: true,
                              productName:
                                item.productSizeColor.product.productName,
                              productId: item.productId,
                              odId: item.odId,
                            })
                          }
                        />
                      </div>
                    </td>
                  ) : (
                    <td className="p-2">
                      <p>Expired</p>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mt-4 text-end w-11/12 text-lg">
          <span className="font-semibold">Total: </span>
          <span>         
            {Intl.NumberFormat('vi-VI',{style:'currency',currency: 'VND',}).format(order.totalPrice)}
          </span>
        </div>

        <div className="text-start w-5/6 mx-auto">
          <span>Order Status:</span>
        </div>

        <Stepper
          currentStep={currentStep}
          steps={titles.length}
          titles={titles}
        />

        <div className="my-6 flex justify-center">
          <Link
            to={`/history?page=${location.state ? location.state.fromPage : 1}`}
            state={{ fromPage: location.state ? location.state.fromPage : 1 }}
            className="w-24 py-2 bg-slate-800 text-white rounded-md"
            replace={true}
          >
            Back
          </Link>
        </div>
      </div>

      {/* Review form  */}
      {isOpen.state && (
        <Suspense fallback={<div className="mx-auto w-full fixed top-1/2">Loading...</div>}>
          <ReviewForm
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            getOrder={getOrder}
          />
        </Suspense>
      )}
    </motion.div>
  ) : (
    <div className="mt-24 py-10">Loading...</div>
  );
}
