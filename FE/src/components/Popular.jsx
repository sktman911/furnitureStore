import React, { useContext, useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

import Products from "./Products";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Popular = () => {
  const {products} = useContext(ShopContext);
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();

  const spring = useSpring({
    opacity: isShow ? 1 : 0,
    transform: isShow ? "translate3d(0,0,0)" : "translate3d(0,50px,0)",
    from: { opacity: 0, transform: "translate3d(0,50px,0)" },
    config: { tension: 180 },
  });  

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("popular");
      const rect = section.getBoundingClientRect();

      if (
        rect.top > window.innerHeight ||
        rect.bottom < window.innerHeight / 2 - 100
      ) {
        setIsShow(false);
      } else {
        setIsShow(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="w-full mt-5 mb-8">
      <h1 className="font-bold text-lg md:text-xl xl:text-2xl pt-3 text-gray-700">
        Our Products
      </h1>
      <animated.div
        id="popular"
        style={spring}
        className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-11/12 max-h-full justify-around mx-auto"
      >
        {products.slice(0,8).map((item, index) => {
          return (
            <Products
              key={index}
              id={item.productId}
              img={item.images[0].imageLink}
              name={item.productName}
              price={Intl.NumberFormat('vi-VI',{style:'currency',currency: 'VND',}).format(item.price)}
              sale = {item.sale}
              salePrice={Intl.NumberFormat('vi-VI',{style:'currency',currency: 'VND',}).format(item.price - (item.price * item.sale /100))}
              // date={new Date(item.createdDate)}
            />
          );
        })}
      </animated.div>

      <button
        type="button"
        onClick={()=> {navigate("/shop"); window.scroll(0,0);}}
        className=" text-yellow-600 border border-yellow-600
       hover:text-white hover:border-white py-3 hover:bg-yellow-600
       active:bg-yellow-700 px-20 mt-4 font-bold"
      >
        Show More
      </button>
    </section>
  );
};

export default Popular;
