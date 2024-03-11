import React from "react";

import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const List = (props) => {

  return (
    <div className="w-11/12 mx-auto shadow-2xl bg-yellow-50 rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="flex justify-between p-5 border-b border-slate-700">
            <th>#</th>
            <th>Color Name</th>
            <th>Hex Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.listData.map((item, index) => (
            <tr key={index} className="flex justify-between items-center px-5 py-3 border-b">
              <td>{index + 1}</td>
              <td className="w-16 text-center">{item.colorName}</td>
              <td className="w-14 h-14 rounded-full border-2 border-gray-300"
               style={{background: item.colorHexcode}}></td>
              <td className="flex gap-2 text-xl">
                <button>
                  <FaRegEdit
                    onClick={() => {
                        props.show(item);
                      props.formAdd(true);
                    }}
                  />
                </button>
                <button>
                  <FaRegTrashAlt onClick={() => props.deleteAPI(item)} />
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
