import React, { useState } from "react";

import { IoClose } from "react-icons/io5";
import { SketchPicker } from 'react-color'

const Forms = (props) => {

  const [color,setColor] = useState(props.isColored ?? "#FFFFFF");

  const handleColor = (color) =>{
    setColor(color.hex)
  }

  const onSubmit = async (data) => {
    data.colorHexCode = color;
    props.postAPI(data);

  };

  const onUpdate = async (data) => {
    data.colorHexCode = color;
    props.putAPI(data);
  };


  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={props.closeForm}
      ></div>
      <form
        onSubmit={props.edit ? props.handleSubmit(onUpdate) : props.handleSubmit(onSubmit)}
        className="w-2/4 bg-white rounded-md mx-auto p-4 shadow-lg fixed top-1/2
           -translate-y-1/2 left-2/4 -translate-x-2/4 z-50"
      >
        <h1 className="font-semibold text-2xl py-4">Color</h1>
        <IoClose
          onClick={props.closeForm}
          className="absolute text-2xl top-3 right-4 cursor-pointer"
        />
        <div className="flex justify-around items-center pt-8 pb-2 w-4/5 mx-auto">
          <label htmlFor="">Color Name: </label>
          <input
            type="text"
            className="py-1 px-3 w-3/5 h-full border-b focus:outline-none
               focus:border-black"
            {...props.register("colorName", { required: "Please fill input" })}
          />
        </div>
        {props.errors.colorName && (
          <p className="w-1/5 text-red-600 text-left mx-auto">
            {props.errors.colorName.message}
          </p>
        )}

        <div className="flex justify-around items-center pt-8 pb-2 w-4/5 mx-auto">
          <label className="">Hex code: </label>
          <div className="w-3/5 flex justify-end">
            <SketchPicker
            className="mx-auto"
            color={color} onChangeComplete={handleColor}
             />
          </div>
        </div>

        <button
          type="submit"
          className="p-3 bg-slate-800 text-white rounded-lg my-5"
        >
          {props.edit ? "Update Color" : "Add Color"}
        </button>
      </form>
    </>
  );
};

export default Forms;
