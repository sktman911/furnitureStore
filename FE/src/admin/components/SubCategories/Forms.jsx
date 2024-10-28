import React, { useEffect, useState } from "react";
import axios from "axios";

import { IoClose } from "react-icons/io5";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import { apiUrl } from "../../../constants";

const Forms = (props) => {
  const [option, setOption] = useState([]);
  const [selected, setSelected] = useState(
    props.edit ? props.edit.categoryId : ""
  );

  const getCategories = () => {
    const url = apiUrl+ "api/Categories/";
    axios
      .get(url)
      .then((res) => setOption(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (props.addForm === true) getCategories();
  }, []);

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
        <h1 className="font-semibold text-2xl py-4">SubCategory</h1>
        <IoClose
          onClick={props.closeForm}
          className="absolute text-2xl top-3 right-4 cursor-pointer"
        />
        <FormInput
          labelText={"SubCategory Name"}
          jsonText={"subCategoryName"}
          type={"text"}
          requiredText={"Please fill input"}
          registerProps={props.register}
          errorsTitle={props.errors.subCategoryName}
        />

        <FormSelect
          labelText={"Category"}
          options={option}
          jsonText={"categoryId"}
          selected={selected}
          setSelected={setSelected}
          requiredText={"Please choose Category"}
          registerProps={props.register}
          errorsTitle={props.errors.categoryId}
          valueKey={"categoryId"}
          labelKey={"categoryName"}
        />
        
        <button
          type="submit"
          className="p-3 bg-slate-800 text-white rounded-lg my-5"
        >
          {props.edit ? "Update SubCategory" : "Add SubCategory"}
        </button>
      </form>
    </>
  );
};

export default Forms;
