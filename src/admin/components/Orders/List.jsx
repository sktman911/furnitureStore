import { format, parseISO } from "date-fns";
import React from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import numeral from "numeral";

const List = ({ listData }) => {
  return (
    <div className="w-11/12 mx-auto shadow-2xl bg-yellow-50 rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="p-3">#</th>
            <th className="p-3">ID</th>
            <th className="p-3">Total Price</th>
            <th className="p-3">Total Quantity</th>
            <th className="p-3">Order Date</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listData.map((item, index) => (
            <tr key={index} className="px-5 py-3 border-b h-full">
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{item.orderId}</td>
              <td className="p-3">{numeral(item.totalPrice).format('0,0.000')} đ</td>
              <td className="p-3">{item.totalQuantity}</td>
              <td className="p-3">
                {format(parseISO(item.orderDate), "dd-MM-yyyy HH:mm:ss")}
              </td>
              <td className="text-xl p-3 justify-center">
                <button>
                  <Link to={`/admin/order/${item.orderId}`} >
                    <IoIosInformationCircleOutline className="mx-1 w-6 h-6 rounded-full hover:bg-slate-700 hover:text-white" />
                  </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
