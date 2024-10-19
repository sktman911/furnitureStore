import React from "react";
import { FaCheck } from "react-icons/fa";

export default function Stepper({ currentStep, steps, titles }) {
  const activeColor = (index) =>
    currentStep >= index ? "bg-green-500" : "border border-green-500 bg-gray-200";
  const isFinalStep = (index) => index === steps - 1;
  const completed = <FaCheck className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>;
  const inCompleted = <FaCheck className="text-green-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />;

  return (
    <>
      <div className="w-1/2 mx-auto flex items-center justify-evenly">
        {Array.from({ length: steps }).map((_, index) => (
          <React.Fragment>
            <div 
              className={`w-10 h-10 rounded-full relative ${activeColor(index)}`}
            >
              {index <= currentStep  ? completed : inCompleted}
            </div>
            {isFinalStep(index) ? null : (
              <div  className={`w-44 h-1 ${activeColor(index)}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="w-2/3 flex mx-auto justify-around">
        {titles.map((item, index) => (
          <>
            <p key={index} className="w-40">{item}</p>      
          </>
        ))}
      </div>
    </>
  );
}
