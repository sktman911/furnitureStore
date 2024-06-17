
import React from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const List = ({ listData }) => {
  return (
    <div className="w-11/12 mx-auto shadow-2xl bg-yellow-50 rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="p-3">#</th>
            <th className="p-3">ID</th>
            <th className="p-3">Customer Name</th>
            <th className="p-3">Customer Phone</th>
            <th className="p-3">Customer Email</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listData.map((item, index) => (
            <tr key={index} className="px-5 py-3 border-b h-full">
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{item.cusId}</td>
              <td className="p-3">{item.cusName}</td>
              <td className="p-3">{item.cusPhone}</td>
              <td className="p-3">{item.email}</td>
              <td className="text-xl p-3 justify-center">
                <button>
                  <Link to={`/admin/customer/${item.cusId}`}>
                    <IoIosInformationCircleOutline className="mx-1" />
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
