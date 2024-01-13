import React from "react";

import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const List = ({listData, show, formAdd, formDel}) => {

  return (
    <div className="w-11/12 mx-auto shadow-2xl bg-yellow-50 rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="flex justify-between p-5 border-b border-slate-700">
            <th>#</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listData.map((item, index) => (
            <tr key={index} className="flex justify-between px-5 py-3 border-b">
              <td>{index + 1}</td>
              <td>{item.categoryName}</td>
              <td className="flex gap-2 text-xl pr-2">
                <button>
                  <FaRegEdit
                    onClick={() => {
                        show(item);
                      formAdd(true);
                    }}
                  />
                </button>
                <button>
                  <FaRegTrashAlt onClick={(e) => formDel(item, e)} />
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
