import React from "react";
import shipping from "../assets/images/category/shipping.svg";
import guarantee from "../assets/images/category/guarantee.svg";
import support from "../assets/images/category/support.svg";
import trophy from "../assets/images/category/trophy.svg";

const Info = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 w-full mx-auto bg-customLightYellow  py-16 gap-8 lg:gap-20 px-8">
      <div className="flex items-center gap-2">
        <img className="h-9 lg:h-10" src={trophy} alt="" />
        <div className="flex flex-col text-left">
          <span className="font-bold">High Quality</span>
          <span className="text-gray-400 text-sm">
            crafted from top materials
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <img className="h-9 lg:h-10" src={guarantee} alt="" />
        <div className="flex flex-col text-left">
          <span className="font-bold">Warranty Protection</span>
          <span className="text-gray-400 text-sm">Over 2 years</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <img className="h-9 lg:h-10" src={shipping} alt="" />
        <div className="flex flex-col text-left">
          <span className="font-bold">Free Shipping</span>
          <span className="text-gray-400 text-sm">Order over 150 $</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <img className="h-9 lg:h-10" src={support} alt="" />
        <div className="flex flex-col text-left">
          <span className="font-bold">24 / 7 Support</span>
          <span className="text-gray-400 text-sm">Dedicated support</span>
        </div>
      </div>
    </div>
  );
};

export default Info;
