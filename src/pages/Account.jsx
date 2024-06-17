import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import avatar from "../assets/images/default_avatar.png";
import { FaRegUser } from "react-icons/fa";
import { IoReceiptOutline } from "react-icons/io5";
import { FaLock } from "react-icons/fa6";
import { Navigate, useNavigate } from "react-router";
import Profile from "../components/Account/Profile.jsx";
import History from "../components/Account/History.jsx";

export const AccountItem = React.memo(({ icon, title, onClick }) => {
  return (
    <li
      key={title}
      onClick={onClick}
      className="flex items-center justify-between hover:bg-white hover:text-yellow-600 rounded-md py-2 px-4 cursor-pointer"
    >
      <span className="w-1/3">{icon}</span>
      <span className="w-2/3 text-center text-lg">{title}</span>
    </li>
  );
});

export default function Account({component}) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const componentMap = {
    profile: <Profile id={user?.cusId} />,
    history: <History id={user?.cusId} />,
    security: <Profile />
  };

  const accountItems = useMemo(
    () => [
      {
        icon: <FaRegUser className="w-5 h-5" />,
        title: "Profile",
        component: <Profile id={user.cusId}/>,
        path: "/account/profile"
      },
      {
        icon: <IoReceiptOutline className="w-5 h-5" />,
        title: "Orders",
        component: <History id={user.cusId}/>,
        path: "/account/history"
      },
      {
        icon: <FaLock className="w-5 h-5" />,
        title: "Security",
        component: <Profile />,
      },
    ],
    []
  );
  
  const [selectedComponent, setSelectedComponent] = useState(componentMap[component]);

  if (user === null) {
    return (
      <>
        <Navigate to="/login" replace={true} />
      </>
    );
  }

  return (
    <section className="mt-24">
      {/* Account left  */}
      <div className="flex w-4/5 mx-auto py-6 mt-36 mb-12 bg-yellow-50 rounded-md">
        <div className="w-1/3 my-5py-4">
          <img src={avatar} alt="" className="w-44 h-44 mx-auto" />
          <h3 className="my-2">{user.username}</h3>
          <div className="w-2/5 mx-auto py-6">
            <ul className="space-y-6">
              {accountItems.map((item, index) => (
                <AccountItem
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  onClick={() => {navigate(item.path);setSelectedComponent(item.component);}}                  
                />
              ))}
            </ul>
          </div>
        </div>

        {/* Account right  */}

        {selectedComponent}
      </div>
    </section>
  );
}
