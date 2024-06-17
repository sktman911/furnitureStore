import React, { useState, useEffect } from "react";
import shipping from "../../assets/images/shipping_img.png";
import { orderAPI } from "../../modules/apiClient";
import { format, parseISO } from "date-fns";
import numeral from "numeral";
import { Link } from "react-router-dom";

export default function History({ id }) {
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    await orderAPI()
      .GET_HISTORY(id)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="w-2/3 my-5">
      <h2 className="text-2xl font-bold text-left w-3/4 mx-auto mb-2">
        Orders
      </h2>
      {orders.map((item, index) => (
        <Link key={index} to={`${item.orderId}`}>
          <div
            className="shadow-2xl w-3/4 mx-auto rounded-lg p-4 flex my-6 bg-white hover:bg-gray-100 cursor-pointer"
          >
            <div className="w-1/4">
              <img src={shipping} alt="" className="w-20 h-20" />
            </div>
            <div className="w-3/4 space-y-2">
              <p className="text-xs text-left text-gray-400">
                {format(parseISO(item.orderDate), "dd-MM-yyyy HH:mm:ss")}
              </p>
              <p className="text-left text-sm">Order status: On delivery</p>
              <p className="text-right text-yellow-600 font-semibold">
                Total price: {numeral(item.totalPrice).format("0,0")} đ
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
