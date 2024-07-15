import React from "react";
import banner from "../assets/images/banner.png";

const Banner = () => {
  return (
    <section className="w-full h-auto mt-24">
      <img className="w-full" src={banner} alt="" />

      <div className="absolute top-1/3 ms-5 left-2/4 text-left space-y-4 w-1/3 p-12 bg-yellow-50 hidden xl:block">
        <p className="text-sm">New Arrival</p>
        <h1 className=" text-yellow-600 font-bold text-5xl">
          Discover Our New Collection
        </h1>
        <p className=" text-sm py-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis.
        </p>
        <button
          className=" bg-yellow-600 text-white px-10 py-4 font-bold
        active:bg-yellow-700 text-sm"
        >
          BUY NOW
        </button>
      </div>
    </section>
  );
};

export default Banner;
