import React, { useEffect, useState } from "react";
import axios from "axios";

import { IoClose } from "react-icons/io5";

const Forms = (props) => {
    const [option,setOption] = useState([])
    const [selected, setSelected] = useState(props.edit ? props.edit.categoryId : "")

    const getCategories = () => {
      const url ="https://localhost:7183/api/Categories/"
      axios.get(url).then(res => setOption(res.data)).catch(err => console.log(err))
    };

    useEffect(() => {
      if(props.addForm===true)
        getCategories();
    },[])

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={props.closeForm}
      ></div>
      <form
        onSubmit={props.edit ? props.handleSubmit(props.updateFunc) : props.handleSubmit(props.submitFunc)}
        className="w-2/4 bg-white rounded-md mx-auto p-4 shadow-lg fixed top-1/2
           -translate-y-1/2 left-2/4 -translate-x-2/4 z-50"
      >
        <h1 className="font-semibold text-2xl py-4">SubCategory</h1>
        <IoClose
          onClick={props.closeForm}
          className="absolute text-2xl top-3 right-4 cursor-pointer"
        />
        <div className="flex justify-between items-center pt-8 pb-2 w-4/5 mx-auto">
          <label htmlFor="">SubCategory Name: </label>
          <input
            type="text"
            className="py-1 px-3 w-3/5 h-full border-b focus:outline-none
               focus:border-black"
            {...props.register("subCategoryName", { required: "Please fill input" })}
          />
        </div>
        {props.errors.subCategoryName && (
          <p className="w-1/5 text-red-600 text-right mx-auto">
            {props.errors.subCategoryName.message}
          </p>
        )}

        <div className="flex justify-between items-center pt-8 pb-2 w-4/5 mx-auto">
          <label htmlFor="">Category: </label>
          <select
            className="py-1 px-3 w-3/5 h-full border-b focus:outline-none
               focus:border-black"
            {...props.register("categoryId", { required: "Please choose Category" })}
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">Choose Category</option>
            {option.map((item, index) => (
                <option key={index} value={item.categoryId}>
                  {item.categoryName}
                </option>
              ))}
          </select>
        </div>
        {props.errors.categoryId && (
          <p className="w-2/5 text-red-600 text-right mx-auto">
            {props.errors.categoryId.message}
          </p>
        )}
        <button type="submit" className="p-3 bg-slate-800 text-white rounded-lg my-5">
          {props.edit ? "Update SubCategory" : "Add SubCategory"}
        </button>
      </form>
    </>
  );
};

export default Forms;
