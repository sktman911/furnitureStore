import React, { useEffect, useState } from "react";
import axios from "axios";

import { IoClose } from "react-icons/io5";

const Forms = ({updateFunc,submitFunc,closeForm,edit,register,errors,handleSubmit,addForm}) => {
    const [option,setOption] = useState([])
    const [selected, setSelected] = useState(edit ? edit.categoryId : "")

    const getCategories = () => {
      const url ="https://localhost:7183/api/Categories/"
      axios.get(url).then(res => setOption(res.data)).catch(err => console.log(err))
    };

    useEffect(() => {
      if(addForm===true)
        getCategories();
    },[])

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={closeForm}
      ></div>
      <form
        onSubmit={edit ? handleSubmit(updateFunc) : handleSubmit(submitFunc)}
        className="w-2/4 bg-white rounded-md mx-auto p-4 shadow-lg fixed top-1/2
           -translate-y-1/2 left-2/4 -translate-x-2/4 z-50"
      >
        <h1 className="font-semibold text-2xl py-4">SubCategory</h1>
        <IoClose
          onClick={closeForm}
          className="absolute text-2xl top-3 right-4 cursor-pointer"
        />
        <div className="flex justify-between items-center pt-8 pb-2 w-4/5 mx-auto">
          <label htmlFor="">SubCategory Name: </label>
          <input
            type="text"
            className="py-1 px-3 w-3/5 h-full border-b focus:outline-none
               focus:border-black"
            {...register("subCategoryName", { required: "Please fill input" })}
          />
        </div>
        {errors.subCategoryName && (
          <p className="w-1/5 text-red-600 text-right mx-auto">
            {errors.subCategoryName.message}
          </p>
        )}

        <div className="flex justify-between items-center pt-8 pb-2 w-4/5 mx-auto">
          <label htmlFor="">Category: </label>
          <select
            className="py-1 px-3 w-3/5 h-full border-b focus:outline-none
               focus:border-black"
            {...register("categoryId", { required: "Please choose Category" })}
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
        {errors.categoryId && (
          <p className="w-2/5 text-red-600 text-right mx-auto">
            {errors.categoryId.message}
          </p>
        )}
        <button type="submit" className="p-3 bg-slate-800 text-white rounded-lg my-5">
          {edit ? "Update SubCategory" : "Add SubCategory"}
        </button>
      </form>
    </>
  );
};

export default Forms;
