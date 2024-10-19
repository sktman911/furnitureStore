import React from "react";

import { IoClose } from "react-icons/io5";
import FormInput from "../FormInput";

const Forms = (props) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={props.closeForm}
      ></div>
      <form
        onSubmit={
          props.edit
            ? props.handleSubmit(props.updateFunc)
            : props.handleSubmit(props.submitFunc)
        }
        className="w-2/4 bg-white rounded-md mx-auto p-4 shadow-lg fixed top-1/2
           -translate-y-1/2 left-2/4 -translate-x-2/4 z-50"
      >
        <h1 className="font-semibold text-2xl py-4">Category</h1>
        <IoClose
          onClick={props.closeForm}
          className="absolute text-2xl top-3 right-4 cursor-pointer"
        />
        <FormInput
          labelText={"Category Name"}
          jsonText={"categoryName"}
          type={"text"}
          registerProps={props.register}
          requiredText={"Please fill input"}
          errorsTitle={props.errors.categoryName}
        />
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
