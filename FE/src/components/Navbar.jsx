import React, { useContext, useEffect, useState } from "react";

import logo from "../assets/images/logo.webp";
import Button from "../components/Button";
import Cart from "./Cart";
import { GiHamburgerMenu } from "react-icons/gi";

import { navLinks } from "../constants";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GET_CART_TOTAL } from "../slice/cartSlice";
import { LOGOUT } from "../slice/userSlice";
import { ShopContext } from "../context/ShopContext";
import {
  AiOutlineUser,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);

  const { categories, subCategories } = useContext(ShopContext);

  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(LOGOUT());
    window.scroll(0, 0);
  };

  useEffect(() => {
    dispatch(GET_CART_TOTAL());
  }, [cart, dispatch]);

  return (
    //  h-24
    <nav className="grid grid-cols-3 items-center drop-shadow-lg fixed top-0 left-0 w-full bg-white z-50">
      {/* responsive hamburger */}
      <div
        className=" w-fit lg:hidden text-2xl cursor-pointer mx-auto"
        onClick={() => setOpen(true)}
      >
        <GiHamburgerMenu />
      </div>

      <div className="flex items-center">
        <Link to={"home"} replace={true}><img src={logo} alt="Logo" className=" w-36 h-24 max-lg:mx-auto cursor-pointer" /></Link>
        <div className="text-xl flex items-center max-lg:hidden">
          <SearchBar />
        </div>
      </div>

      {/* responsive cart */}
      <div
        className="w-fit lg:hidden text-2xl cursor-pointer relative mx-auto"
        onClick={() => setOpen(true)}
      >
        <AiOutlineShoppingCart />
      </div>

      <ul className="flex-1 flex justify-center items-center gap-5 xl:gap-14 max-lg:hidden h-full">
        {navLinks.map((link, index) => (
          <li key={index} className="h-full">
            <span
              onClick={() => {
                setActive(link.label);
              }}
              className="font-semibold font-poppins text-md group h-full cursor-default"
            >
              <Link
                to={link.href}
                onClick={() => window.scroll(0, 0)}
                className=" h-full flex items-center"
              >
                {link.label}
              </Link>
              {link.subMenu && (
                <div
                  className="absolute top-24 text-left uppercase opacity-0 transition-all translate-y-4 duration-300 ease-out 
                group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto"
                >
                  <div className="py-3">
                    <div className="absolute left-3 w-4 h-4 mt-1 bg-white rotate-45"></div>
                  </div>
                  <div className="bg-white p-8 shadow-lg">
                    <ul className="grid grid-cols-3 gap-10">
                      {categories.map((category, index) => (
                        <li key={index}>
                          <Link
                            to={`shop/${category.categoryName.toLowerCase()}`}
                            onClick={() => window.scrollTo(0, 0)}
                          >
                            <h1 className="text-lg py-2">
                              {category.categoryName}
                            </h1>
                          </Link>
                          <ul>
                            {subCategories
                              .filter(
                                (e) => e.categoryId === category.categoryId
                              )
                              .map((subCategory, index) => (
                                <li
                                  key={index}
                                  className=" text-sm text-gray-400 py-1.5"
                                >
                                  <Link
                                    to={`shop/${category.categoryName.toLowerCase()}/${subCategory.subCategoryName.toLowerCase()}`}
                                    onClick={() => window.scrollTo(0, 0)}
                                  >
                                    {subCategory.subCategoryName}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </span>

            {active === link.label ? (
              <hr className="-translate-y-5 border-2 border-solid border-black rounded-2xl" />
            ) : null}
          </li>
        ))}
      </ul>

      <ul className="flex-1 flex justify-center items-center gap-4 xl:gap-10 max-lg:hidden">
        <li className="cursor-pointer">
          <Link to={"/profile"} aria-label="Your profile">
            <div
              className="text-xl"
              onClick={() => {
                window.scroll(0, 0);
              }}
            >
              <AiOutlineUser />
            </div>
          </Link>
        </li>

        <li className="cursor-pointer">
          <Link to={"/favourite"} aria-label="Your favourite">
            <div
              className="text-xl"
              onClick={() => {
                window.scroll(0, 0);
              }}
            >
              <AiOutlineHeart />
            </div>
          </Link>
        </li>

        <li className="relative cursor-pointer">
          <div
            className="text-xl"
            onClick={() => {
              setOpen(true);
            }}
          >
            <AiOutlineShoppingCart />
          </div>
          <span
            className="w-5 h-5 text-sm rounded-full absolute top-1/2 left-1/2 bg-red-500
               text-white flex items-center justify-center"
          >
            {cart.cartTotalQuantity}
          </span>
        </li>

        {user == null ? (
          <li className="flex gap-4 ml-5">
            <Button
              onClick={() => window.scroll(0, 0)}
              title="Login"
              link="/login"
            />
            <Button
              onClick={() => window.scroll(0, 0)}
              title="Signup"
              link="/signup"
            />
          </li>
        ) : (
          <li className="flex gap-4 ml-5">
            <span>Hi, {user.username}</span>
            <Button onClick={() => logout()} title="Logout" link="/login" />
          </li>
        )}
      </ul>

      <Cart open={open} setOpen={setOpen} />
    </nav>
  );
};

export default Navbar;
