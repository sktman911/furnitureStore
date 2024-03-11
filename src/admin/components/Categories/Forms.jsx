import React from "react";

import { IoClose } from "react-icons/io5";

const Forms = (props) => {
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
        <h1 className="font-semibold text-2xl py-4">Category</h1>
        <IoClose
          onClick={props.closeForm}
          className="absolute text-2xl top-3 right-4 cursor-pointer"
        />
        <div className="flex justify-around items-center pt-8 pb-2 w-4/5 mx-auto">
          <label htmlFor="">Category Name: </label>
          <input
            type="text"
            className="py-1 px-3 w-3/5 h-full border-b focus:outline-none
               focus:border-black"
            {...props.register("categoryName", { required: "Please fill input" })}
          />
        </div>
        {props.errors.categoryName && (
          <p className="w-1/5 text-red-600 text-left mx-auto">
            {props.errors.categoryName.message}
          </p>
        )}
        <button
          type="submit"
          className="p-3 bg-slate-800 text-white rounded-lg my-5"
        >
          {props.edit ? "Update Category" : "Add Category"}
        </button>
      </form>
    </>
  );
};

export default Forms;
