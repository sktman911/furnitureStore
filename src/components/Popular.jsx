import React,{useContext} from "react";

import { ShopContext } from "../context/ShopContext";
import Products from "./Products";

const Popular = () => {
  const {products} = useContext(ShopContext); 

  return (
    <section className="w-full mt-5 mb-8">
      <h1 className="font-bold text-2xl pt-3 text-gray-700">Our Products</h1>
      <div className="grid lg:grid-cols-4 gap-8 w-11/12 max-h-full justify-around mx-auto">
        {products.map((item, index) => {
          return (
            <Products
              key={index}
              id={item.productId}
              img={item.images[0].imageLink}
              name={item.productName}
              price={item.price}
            />
          );
        })}
      </div>

      <button
        className=" text-yellow-600 border border-yellow-600
       hover:text-white hover:border-white py-3 hover:bg-yellow-600
       active:bg-yellow-700 px-32 mt-4"
      >
        Show More
      </button>
    </section>
  );
};

export default Popular;
