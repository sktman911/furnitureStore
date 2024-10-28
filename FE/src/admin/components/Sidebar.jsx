import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";

import logo from "../assets/images/_logo.png";
import { useStateContext } from "../../context/StateContext";
import axios from "axios";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCouch, faUserFriends, faUsers,faList,faListAlt, faHome, faPalette, faReceipt}
from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { apiUrl } from "../../constants";
const Sidebar = () => {
  // Add Sidebar icon
  library.add( faCouch, faUserFriends, faUsers, faList, faListAlt, faHome, faPalette,faReceipt)

  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  const [functions, setFunctions] = useState([]);
  const [titles, setTitles] = useState([]);

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const inActive =
    "flex items-center gap-5 text-white m-2 pl-6 py-2.5 rounded-lg bg-slate-600";
  const unActive =
    "flex items-center gap-5 m-2 pl-6 py-2.5 rounded-lg text-gray-300 " +
    "dark:text-gray-200 dark:hover:text-black hover:bg-gray-100 hover:text-slate-700";

  const getFunctions = (url = apiUrl + "api/Functions/") => {
    axios
      .get(url)
      .then((res) => {
        setFunctions(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getTitles = (url = apiUrl + "api/Titles/") => {
    axios
      .get(url)
      .then((res) => {
        setTitles(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTitles();
    getFunctions();
  },[]);


  return (
    <div
      className="h-screen md:overflow-hidden overflow-auto 
    md:hover:overflow-auto pb-10"
    >
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/admin"
              className="flex items-center gap-2 text-xl 
            font-extrabold dark:text-white text-white mt-4"
              onClick={handleCloseSidebar}
            >
              <img
                src={logo}
                className="ml-1 w-16 h-16 rounded-full bg-white"
                alt=""
              />
              2F Furniture
            </Link>
            <button
              className="text-2xl text-white rounded-full p-3
             mt-4 block hover:bg-light-gray"
              onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
            >
              <MdOutlineCancel />
            </button>
          </div>

          <div className="mt-10">
            {titles.map((item, index) => (
              <div key={index}>
                <p className="uppercase text-white text-left m-3 mt-5 pl-3">
                  {item.functionTitle}
                </p>
                {functions.filter(func => func.functionTitle === item.functionTitle)
                .map((link, index) => (
                    <NavLink
                      to={link.route}
                      key={index}
                      className={({ isActive }) =>
                        isActive ? inActive : unActive
                      }
                      onClick={handleCloseSidebar}
                    >
                      <FontAwesomeIcon icon={link.icon} />
                      <span className="capitalize">{link.funtionName}</span>
                    </NavLink>
                  ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
