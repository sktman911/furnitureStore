import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import defaultImg from "../../assets/images/default_img.png"
import { IoClose } from "react-icons/io5";
import { ShopContext } from "../../../context/ShopContext";

const Forms = (props) => {
  
  const [val,setVal] = useState(defaultImg);
  const {subCategories, categories} = useContext(ShopContext);


  const showPreview = (e) => {
    if(e.target.files && e.target.files[0]){
      URL.revokeObjectURL(val);
      let file =  e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setVal(imageUrl)
      }
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={props.closeForm}
      ></div>
      <form
        onSubmit={props.handleSubmit(props.submitFunc)}
        className="w-2/4 bg-white rounded-md mx-auto p-4 shadow-lg fixed top-1/2
           -translate-y-1/2 left-2/4 -translate-x-2/4 z-50"
      >
        <h1 className="font-semibold text-2xl py-4">Product</h1>
        <IoClose
          onClick={props.closeForm}
          className="absolute text-2xl top-3 right-4 cursor-pointer"
        />

        {/* Form input */}
        <div className="flex items-center pt-8">
          <div className="inline pb-2 w-1/2 mx-auto">
            <label>Product Name: </label>
            <input
              type="text"
              className="py-1 px-3 w-3/5 h-full border-b focus:outline-none
               focus:border-black"
              {...props.register("productName", { required: "Please fill name" })}
            />
            {props.errors.productName && (
              <p className="w-2/4 text-red-600 text-right mx-auto">
                {props.errors.productName.message}
              </p>
            )}
          </div>

          <div className="inline pb-2 w-1/2 mx-auto">
            <label>Price: </label>
            <input
              type="text"
              className="py-1 px-3 w-3/5 h-full border-b focus:outline-none
               focus:border-black"
              {...props.register("price", {
                required: "Please fill price",
                validate: (value) =>
                  (!isNaN(value) && value >= 5) || "Invalid price",
              })}
            />
            {props.errors.price && (
              <p className="w-2/4 my-2 text-red-600 text-left mx-auto">
                {props.errors.price.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center">
          <div className="inline pt-8 pb-2 w-1/2 mx-auto">
            <label htmlFor="">SubCategory: </label>
            <select
              className="py-1 px-3 w-3/5 h-full border-b focus:outline-none
               focus:border-black"
              {...props.register("subCategoryId", {
                required: "Please choose SubCategory",
              })}
            >
              <option value="">Choose SubCategory</option>
              {categories.map((item, index) => (
                <optgroup key={index} label={item.categoryName}>
                  {subCategories
                    .filter((e) => e.categoryId === item.categoryId)
                    .map((subItem, index) => (
                      <option key={index} value={subItem.subCategoryId}>
                        {subItem.subCategoryName}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
            {props.errors.subCategoryId && (
              <p className="w-full text-red-600 text-right mx-auto">
                {props.errors.subCategoryId.message}
              </p>
            )}
          </div>

          <div className="inline pt-8 pb-2 w-1/2 mx-auto">
            <label htmlFor="">Image: </label>
            <input
              type="file"
              className="py-1 px-3 w-3/5 h-full file:border-none file:px-4 file:py-2 file:rounded-full 
              file:bg-gray-300 file:cursor-pointer cursor-pointer bg-gray-300 rounded-full file:text-black
              file:hover:text-white file:active:text-black"
              {...props.register("imageFile", { required: "Please choose image", onChange: (e) => showPreview(e) })}
            />
            {props.errors.imageFile && (
              <p className="w-1/2 text-red-600 text-right mx-auto">
                {props.errors.imageFile.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-end pb-2">
          <div className="flex flex-col w-1/2 text-left pt-6 px-2">
            <label className="my-2">Description: </label>
            <textarea
              rows="5"
              className="border-2 rounded-lg resize-none "
              {...props.register("description", { required: false })}
            ></textarea>
          </div>
          <div className="flex justify-center w-1/2">
              <img src={val} className=" w-48 h-40" alt="" />
          </div>
        </div>
        {/* End form input */}

        <button
          type="submit"
          className="p-3 bg-slate-800 text-white rounded-lg my-5"
        >
          Add Product
        </button>
      </form>
    </>
  );
};

export default Forms;
