import React from "react";
import dining from "../assets/images/dining.webp"
import living from "../assets/images/living.webp"
import bedroom from "../assets/images/bedroom.webp"

const Browser = () => {
  return (
    <section className="w-full max-container max-lg:h-max">
        <div className="mt-4">
            <h1 className=" font-bold text-lg md:text-xl xl:text-2xl">Browse The Range</h1>
            <p className=" text-gray-500 pt-2 text-sm xl:text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="flex w-10/12 mx-auto justify-between gap-6 pt-10">
          <div className=" w-4/12">
            <img className="w-full h-fit"  src={dining} alt="Dining" loading="lazy"/>
            <h1 className="py-5 font-bold tracking-wider">Dining</h1>
          </div>
          <div className=" w-4/12">
            <img className="w-full h-fit"  src={living} alt="Living" loading="lazy"/>
            <h1 className="py-5 font-bold tracking-wider">Living</h1>
          </div>
          <div className=" w-4/12">
            <img className="w-full h-fit"  src={bedroom} alt="Bedroom" loading="lazy"/>
            <h1 className="py-5 font-bold tracking-wider">Bedroom</h1>
          </div>
        </div>
    </section>
  );
};

export default Browser;
