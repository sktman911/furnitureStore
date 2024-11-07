import React, { useEffect, useState } from "react";

import { dbContent } from "../../constants";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { statisticAPI } from "../modules/api/api";
import { FaCircle } from "react-icons/fa";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const curentMonth = new Date().getMonth() +1;
  const currentYear = new Date().getFullYear();

  const [totalSold, setTotalSold] = useState([]);
  const [totalConsume, setTotalConsume] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [date, setDate] = useState({ month: curentMonth, year: currentYear });

  useEffect(() => {
    statisticAPI()
      .GET_TOTALSOLD()
      .then((res) => setTotalSold(res.data))
      .catch((err) => console.log(err));

    statisticAPI()
      .GET_TOTALCONSUME()
      .then((res) => setTotalConsume(res.data))
      .catch((err) => console.log(err));

      getRevenue();
  }, []);

  const getRevenue = () => {
    statisticAPI().GET_REVENUE(date.month, date.year).then(res => setRevenue(res.data)).catch(err => console.log(err))
  }

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

      <div className="mt-12">
        <div className="bg-white w-10-11 h-full rounded-lg mx-auto">
          <p className="font-bold text-xl text-center pl-2">Revenue</p>
          <div className="flex justify-end gap-6 mr-3">
            <label className="text-lg" htmlFor="">
              Month:{" "}
            </label>
            <select className="w-20 border-2 text-center" name="month" onChange={(e) => setDate(prev => ({...prev,month: e.target.value}))}>
              {Array.from({ length: 12 }).map((_, index) => {
                return (
                  <option
                    key={index + 1}
                    value={index + 1}
                    selected={index + 1 === curentMonth}
                  >
                    {index + 1}
                  </option>
                );
              })}
            </select>
            <label htmlFor="" className="text-lg">
              Year:{" "}
            </label>
            <select className="w-20 border-2 text-center" name="year" onChange={(e) => setDate(prev => ({...prev,year: e.target.value}))}>
              {/* set minimum year  */}
              {Array.from({ length: new Date().getFullYear() - 2024 + 1 }).map(
                (_, index) => {
                  const year = 2024 + index;
                  return (
                    <option
                      key={year}
                      value={year}
                      selected={year === currentYear}
                    >
                      {year}
                    </option>
                  );
                }
              )}
            </select>

            <button onClick={getRevenue} className="bg-customStrongYellow py-1 px-4 text-white rounded-md active:bg-yellow-700">Apply</button>
          </div>
          <div className="w-full h-1/2">
            <Line
              
              options={{responsive: true,scales:{x:{title:{display: true,text: "Date"}},y:{title: {display: true,text:"Money"},beginAtZero:true, min: 0}},}}
              data={{
                
                labels: revenue.map((item) => Intl.DateTimeFormat('us',{dateStyle: 'short'}).format(new Date(item.date))),
                datasets: [
                  {
                    label: "Revenue",
                    data: revenue.map((item) => item.revenue),
                    borderColor: "#B88E2F",
                    backgroundColor: "#B88E2F",
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>

      <div className="my-12 flex pb-10">
        <div className="bg-white w-4/6 h-full rounded-lg mx-auto shadow-2xl ">
          <p className="font-bold text-lg text-left ml-6 my-2">Top Product</p>
          <table className="w-full table-fixed">
            <thead>
              <tr className="w-full border-t-2 border-b-2">
                <th>Rank</th>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Status</th>
                <th>Sold Quantity</th>
              </tr>
            </thead>
            <tbody>
              {totalSold.map((item, index) => (
                <tr
                  key={item.productId}
                  className="w-full py-2 border-b-2"
                >
                  <td>{index + 1}</td>
                  <td>
                    {item.productName.length > 16
                      ? item.productName.slice(0, 16) + "..."
                      : item.productName}
                  </td>
                  <td>
                    <img
                      src={item.imageSrc}
                      className=" object-cover w-24 h-24 mx-auto"
                      alt="Alt"
                    />
                  </td>
                  <td>
                    {Intl.NumberFormat("vi-VI", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.price)}
                  </td>
                  <td>
                    {item.status === true ? (
                      <FaCircle color="green" size={14} className="mx-auto" />
                    ) : (
                      <FaCircle color="red" size={14} className="mx-auto" />
                    )}
                  </td>
                  <td>{item.totalSoldQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white w-1/4 h-full rounded-lg mx-auto shadow-2xl">
          <p className="font-bold text-lg text-left my-2 ml-2">Top Customer</p>
          <ul>
            {totalConsume.map((item, index) => (
              <li className="border-b-2 py-2 last:border-none flex justify-around items-center">
                <div className="w-1/12">
                  <p className="text-lg font-bold">{index + 1}</p>
                </div>
                <div className="w-11/12">
                  <div className="flex items-center w-full gap-20 justify-around">
                    <span>{item.customerName}</span>
                    <span className="text-sm text-gray-500">
                      Tel: {item.customerPhone}
                    </span>
                  </div>
                  <p className="text-sm text-left ml-3 mt-2 text-gray-500">
                    Consume:{" "}
                    <span className="font-semibold text-black">
                      {Intl.NumberFormat("vi-VI", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.totalConsume)}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
