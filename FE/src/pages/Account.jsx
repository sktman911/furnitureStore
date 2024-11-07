import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import avatar from "../assets/images/default_avatar.png";
import { FaRegUser } from "react-icons/fa";
import { IoReceiptOutline } from "react-icons/io5";
import { FaLock } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Profile from "../components/Account/Profile.jsx";
import History from "../components/Account/History.jsx";
import {motion} from "framer-motion";

export const AccountItem = React.memo(
  ({ icon, title, active, setActive }) => {
    const titleText = title.charAt(0).toUpperCase() + title.slice(1);
    return (
      <li
        key={title}
        className={
          title === active
            ? "bg-white text-yellow-600 rounded-md py-2 px-4"
            : "hover:bg-white hover:text-yellow-600 rounded-md py-2 px-4"
        }
      >
        <Link to={"/"+title} className="flex items-center justify-between cursor-pointer" onClick={() => setActive(title)}>
          <span className="w-1/3">{icon}</span>
          <span className="w-2/3 text-center text-lg">{titleText}</span>
        </Link>
      </li>
    );
  }
);

export default function Account({ component }) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [active, setActive] = useState(component);

  useEffect(() => {
    if (user === null) {
      navigate("/login", { replace: true });
      return;
    }

    if (user.role) {
      navigate("/home", { replace: true });
      return;
    }

  }, []);

  const componentMap = {
    profile: <Profile id={user?.cusId} />,
    history: <History id={user?.cusId} />,
  };

  const accountItems = useMemo(
    () => [
      {
        icon: <FaRegUser className="w-5 h-5" />,
        title: "profile",
      },
      {
        icon: <IoReceiptOutline className="w-5 h-5" />,
        title: "history",
      },
      {
        icon: <FaLock className="w-5 h-5" />,
        title: "Security",
      },
    ],
    []
  );

  return (
    <motion.section className="mt-24" initial={{opacity: 0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration: 0.1}}>
      {/* Account left  */}
      <div className="flex flex-col lg:flex-row w-4/5 mx-auto py-6 mt-36 mb-12 bg-yellow-50 rounded-md">
        <div className="w-full lg:w-1/3 my-5">
          <div>
            <img src={avatar} alt="" className="w-44 h-44 mx-auto" />
          </div>
          <h3 className="my-2">{user?.username}</h3>
          <div className="w-3/5 md:w-2/5 mx-auto py-6">
            <ul className="space-y-6">
              {accountItems.map((item, index) => (
                <AccountItem
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  active={active}
                  setActive={setActive}
                />
              ))}
            </ul>
          </div>
        </div>

        {/* Account right  */}

        {componentMap[component]}
      </div>
    </motion.section>
  );
}
