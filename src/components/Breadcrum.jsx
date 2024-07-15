import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { RxDividerVertical } from "react-icons/rx";

const Breadcrum = (props) => {
  const { product } = props;

  return (
    <div className="flex items-center w-full py-8 px-5 gap-2 mx-auto bg-yellow-50 uppercase text-sm lg:text-lg">
      <span className=" text-gray-400">Home</span>
      <IoIosArrowForward /> <span className="text-gray-400">Shop</span>
      <IoIosArrowForward /><span className="text-gray-400">{product.categoryName}</span>
      <IoIosArrowForward /><span className="text-gray-400">{product.subCategoryName}</span>
      <RxDividerVertical className=" text-2xl"/> <span>{product.productName}</span>
    </div>
  );
};

export default Breadcrum;
