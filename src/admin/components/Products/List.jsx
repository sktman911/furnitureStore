import React from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const List = ({ listData, formDel }) => {
  return (
    <div className="w-11/12 mx-auto shadow-2xl bg-yellow-50 rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="p-3">#</th>
            <th className="p-3">Image</th>
            <th className="p-3">Product Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">SubCategory Name</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listData.map((item, index) => (
            <tr key={index} className="px-5 py-3 border-b h-full">
              <td className="p-3">{index + 1}</td>
              <td className="p-3 flex justify-center">
                <img src={item.images[0].imageLink} className="w-20 h-20" alt="" />
              </td>
              <td className="p-3">{item.productName}</td>
              <td className="p-3">{item.price}</td>
              <td className="p-3">{item.subCategoryName}</td>
              <td className="text-xl p-3 justify-center">
                <button>
                  <Link to={`/admin/product/${item.productId}`}>
                    <FaRegEdit className="mx-1" />
                  </Link>
                </button>
                <button>
                  <FaRegTrashAlt
                    className="mx-1"
                    onClick={(e) => formDel(item, e)}
                  />
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
