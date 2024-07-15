import React, { useContext } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { ShopContext } from "../context/ShopContext";
import Products from "../components/Products";
import Info from "../components/Info";
import { useParams } from "react-router";

const Shop = (props) => {
  const { products } = useContext(ShopContext);
  const { subCategoryName } = useParams();

  return (
    <section className="w-full max-container max-lg:h-max mt-24">
      <div className="relative">
        <img className="w-full h-full" src={props.banner} alt="" />
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 font-bold">
          <h1 className="text-2xl md:text-4xl my-3 text-white">Shop</h1>
          <span className="uppercase text-white text-sm md:text-lg">
            Home
            <span className="mx-2">&gt;</span>
            <span className="font-normal">Shop</span>
            <span className="mx-2">&gt;</span>
            <span className=" font-normal">{props.category}</span>
            {subCategoryName ? (
              <>
                <span className="mx-2">&gt;</span>
                <span className=" font-normal">{subCategoryName}</span>
              </>
            ) : null}
          </span>
        </div>
      </div>

      <div className="w-full bg-yellow-50 max-lg:h-max grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 items-center py-5">
        <div className="grid grid-cols-2 gap-5 text-center">
          <div className="flex items-center justify-center gap-3">
            <HiOutlineAdjustmentsHorizontal className="text-lg" />
            <span>Filter</span>
          </div>
          <div className="flex gap-6 items-center justify-center lg:justify-normal">
            <span className=" text-2xl">|</span>
            <span>Showing 1 - 10 of 100 results</span>
          </div>
        </div>

        <div className="grid grid-cols-2 items-center">
          <div className="flex gap-5 justify-center lg:justify-end items-center">
            <span>Show</span>
            <input
              type="text"
              value="10"
              className=" outline-none w-1/6 text-center text-gray-400 py-2"
            />
          </div>
          <div className="flex gap-5 justify-center items-center">
            <span>Sort by</span>
            <input
              type="text"
              placeholder="Default"
              className=" outline-none w-1/3 text-center text-gray-400 py-2"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-11/12 justify-around mx-auto my-5">
        {products.map((item, index) => {
          if (subCategoryName && subCategoryName === item.subCategoryName && props.category === item.categoryName) {
            return (
              <Products
                key={index}
                id={item.productId}
                img={item.images[0].imageLink}
                name={item.productName}
                des={item.description}
                price={item.price}
              />
            );
          } else if (!subCategoryName && props.category === item.categoryName) {
            return (
              <Products
                key={index}
                id={item.productId}
                img={item.images[0].imageLink}
                name={item.productName}
                des={item.description}
                price={item.price}
              />
            );
          }
          else if (props.category === "all") {
            return (
              <Products
                key={index}
                id={item.productId}
                img={item.images[0].imageLink}
                name={item.productName}
                des={item.description}
                price={item.price}
              />
            );
          } else return null;
        })}
      </div>

      <Info />
    </section>
  );
};

export default Shop;
