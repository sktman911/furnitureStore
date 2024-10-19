import React from "react";

import { dbContent } from "../../constants";

const Dashboard = () => {
  return (
    <div className="mt-12">
      <div className="flex m-3 flex-wrap justify-around gap-1 items-center">
        {dbContent.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:text-gray-200 dark:bg-black 
            md:w-56 p-4 pt-9 rounded-2xl shadow-xl drop-shadow-xl"
          >
            <button
              typeof="button"
              className={`text-2xl opacity-90 rounded-full p-4 
              hover:drop-shadow-xl text-${item.iconColor} bg-${item.iconBg}`}
            >
              {item.icon}
            </button>
            <p className="mt-3">
              <span className="text-lg font-semibold">{item.amount}</span>
              <span className={`text-sm ml-2 text-${item.perColor}`}>
                {item.per}
              </span>
            </p>
            <p className="text-sm text-gray-400 mt-1">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
