import React from "react";
import { useLocation } from "react-router";

import Sidebar from "../admin/components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Routers from "../routers/Routers";
import AdminNavbar from "../admin/components/AdminNavbar";
import AdminFooter from "../admin/components/AdminFooter";
import { useStateContext } from "../context/StateContext";
import { useSelector } from "react-redux";

const Layout = () => {
  const location = useLocation();
  const { activeMenu, setActiveMenu } = useStateContext();
  const user = useSelector((state) => state.user);

  return (
    <>
      {!location.pathname.startsWith("/admin") ? (
        <>
          <Navbar />
          <div>
            <Routers />
          </div>
          <Footer />
        </>
      ) : (
        <>
          {activeMenu ? (
            <div className="w-80 bg-slate-800 shadow-2xl dark:bg-black fixed">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-black "></div>
          )}

          <div
            className={`bg-white min-h-screen ${
              activeMenu ? "md:ml-80" : "flex-1"
            }`}
          >
            <div className="fixed md:static shadow-xl w-full bg-white">
              <AdminNavbar />
            </div>

            <div>
              <Routers />
            </div>
          </div>
          <div className={`bg-white ${activeMenu ? "md:ml-80" : "flex-1"}`}>
            <AdminFooter />
          </div>
        </>
      )}
    </>
  );
};

export default Layout;
