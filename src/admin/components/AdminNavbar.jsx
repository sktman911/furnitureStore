import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoChatboxOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";

import { useStateContext } from "../../context/StateContext";
import ava from "../assets/images/logo.jpg";

const NavButton = ({ func, icon }) => (
  <button
    type="button"
    // Sửa lại sau
    onClick={func}
    //
    className="relative text-xl rounded-full p-5 hover:bg-gray-100"
  >
    <span className="absolute inline-flex rounded-full
    h-4 w-4 top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2">
    </span>
    {icon}
  </button>
);


const AdminNavbar = () => {
  const {
    activeMenu,
    setActiveMenu,
    clicked,
    setClicked,
    handleClicked,
    screenSize, setScreenSize
  } = useStateContext();

  
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize',handleResize)
    handleResize();

    return () => window.removeEventListener('resize',handleResize)
  },[])

  useEffect(() => {
    if(screenSize <= 900)
      setActiveMenu(false);
    else
      setActiveMenu(true);
  }, [screenSize]);
  

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton
        icon={<AiOutlineMenu />}
        func={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
      />

      <div className="flex">
        <NavButton icon={<IoChatboxOutline />} func={"chat"} />

        <NavButton icon={<IoMdNotificationsOutline />} func={"notify"} />

        <div className="flex items-center gap-2 cursor-pointer p-1 rounded-lg">
          <img src={ava} alt="" className="rounded-full w-8 h-8" />
          <p className="text-gray-400 text-sm">
            <span>Hi, </span>
            <span className="font-bold ml-1">John</span>
          </p>
          <MdKeyboardArrowDown />
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
