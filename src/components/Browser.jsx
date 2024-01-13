import React from "react";
import dining from "../assets/images/dining.png"
import living from "../assets/images/living.png"
import bedroom from "../assets/images/bedroom.png"

const Browser = () => {
  return (
    <section className="w-full max-container max-lg:h-max">
        <div>
            <h1 className=" font-bold text-2xl">Browse The Range</h1>
            <p className=" text-gray-500 pt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="flex w-10/12 mx-auto justify-between gap-6 pt-10">
          <div className=" w-4/12">
            <img className="w-full"  src={dining} alt="Dining" />
            <h1 className="py-5 font-bold tracking-wider">Dining</h1>
          </div>
          <div className=" w-4/12">
            <img className="w-full"  src={living} alt="Living" />
            <h1 className="py-5 font-bold tracking-wider">Living</h1>
          </div>
          <div className=" w-4/12">
            <img className="w-full"  src={bedroom} alt="Bedroom" />
            <h1 className="py-5 font-bold tracking-wider">Bedroom</h1>
          </div>
        </div>
    </section>
  );
};

export default Browser;
