import React from "react";
import Button from "./Button";

const Products = (props) => {

  return (
    <div className="my-6 relative group">
      <div className="hidden group-hover:block absolute bg-gray-700 opacity-30 w-full h-full z-20"></div>
      <img className="w-full h-96" src={props.img} alt="" />
      <div className=" w-full text-left ps-3 py-5 space-y-2 bg-gray-100">
        <h1 className="font-bold text-lg tracking-wide">{props.name}</h1>
        <div>
          <p className="font-bold text-md">$ {props.price}</p>
        </div>
      </div>

      <div
        className=" hidden absolute w-full top-2/4 left-2/4 -translate-x-2/4 
              -translate-y-2/4 group-hover:block z-20"
      >

        <Button

          className="bg-white py-3 px-10 text-sm text-yellow-600 font-bold active:opacity-90"
          title="Add to cart"
          link={`/product/${props.id}`}
          onClick={() => window.scroll(0,0)}
        />
      </div>

      <div className="absolute top-5 right-5 z-10">
        <div className="w-10 h-10 flex items-center rounded-full text-sm 
        justify-center text-white bg-red-400">
          -30%
        </div>
      </div>
    </div>
  );
};

export default Products;
