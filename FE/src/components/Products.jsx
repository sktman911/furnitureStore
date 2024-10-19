import React from "react";
import Button from "./Button";

const Products = (props) => {
  // display new
  // const time = new Date() - props.date;

  return (
    <div className="my-6 relative group">
      <div className="hidden group-hover:block absolute bg-gray-700 opacity-30 w-full h-full z-20"></div>
      <img className="w-full h-auto" src={props.img} alt="" loading="lazy" />
      <div className=" w-full text-left ps-3 py-5 space-y-2 bg-gray-100">
        <h1 className="font-bold text-sm md:text-lg tracking-wide">
          {props.name}
        </h1>
        <div className="flex gap-4">
          <p
            className={`font-bold text-sm md:text-md ${
              props.sale !== null ? "line-through" : null
            }`}
          >
            {props.price} đ
          </p>
          {props.sale !== null && props.salePrice ? (
            <p className="font-bold text-sm md:text-md text-red-500">
              {props.salePrice}đ
            </p>
          ) : null}
        </div>
      </div>

      <div
        className="hidden absolute w-full top-2/4 left-2/4 -translate-x-2/4 
              -translate-y-2/4 group-hover:block z-20"
      >
        <Button
          className="bg-white py-3 px-10 text-sm text-yellow-600 font-bold active:opacity-90"
          title="View detail"
          link={`/product/${props.id}`}
          onClick={() => window.scroll(0, 0)}
        />
      </div>

      {/* {props.date && Math.floor(time / (1000 * 60 * 60 * 24)) < 300 ? (
        <div className="absolute top-2 left-2 md:top-5 md:left-5 z-10">
          <div
            className="w-10 h-10 flex items-center rounded-full text-sm 
        justify-center text-white bg-green-400"
          >
            New
          </div>
        </div>
      ) : null} */}

      {props.sale !== null ? (
        <div className="absolute top-2 right-2 md:top-5 md:right-5 z-10">
          <div
            className="w-10 h-10 flex items-center rounded-full text-sm 
        justify-center text-white bg-red-400"
          >
            -{props.sale}%
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Products;
