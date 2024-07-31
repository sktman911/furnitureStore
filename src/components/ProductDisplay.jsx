import React, { useContext, useEffect, useState } from "react";

import { FaStar, FaStarHalfAlt, FaFacebook } from "react-icons/fa";
import { RxDividerVertical } from "react-icons/rx";
import ColorPicker from "./ColorPicker";
import SizePicker from "./SizePicker";
import Button from "./Button";
import { FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";
import Description from "./Description";
import Products from "./Products";

import { ShopContext } from "../context/ShopContext";
import { useDispatch } from "react-redux";
import { errorMessage } from "../constants/message";
import numeral from "numeral";
import { imageAPI } from "../modules/apiClient";

const ProductDisplay = (props) => {
  const { products } = useContext(ShopContext);
  const { product } = props;

  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [subImages, setSubImages] = useState([]);

  const getSubImages = () => {
    imageAPI()
      .GET(product.productId)
      .then((res) => setSubImages(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() =>{
    getSubImages();
  },[product.productId])

  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    if (size === null || color === null) {
      errorMessage("Please choose size and color");
      return;
    }

    return dispatch({
      type: "cart/ADD_TO_CART",
      payload: { product, quantity, size, color },
    });
  };

  const handleSize = (size) => {
    setSize(size);
  };

  const handleColor = (color) => {
    setColor(color);
  };

  const handlePlus = () => {
    if (quantity < 99) setQuantity((prev) => prev + 1);
  };

  const handleMinus = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleTypeQuantity = (amount) => {
    if (amount >= 99) amount = 99;
    else if (amount <= 0) amount = 1;

    setQuantity(amount);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-20 w-5/6 mx-auto py-10">
        <div className="flex gap-4 xl:gap-8 w-full lg:w-1/2">
          <div className="flex flex-col gap-12 xl:gap-5 w-1/6 h-fit justify-between my-1">
            {subImages.map((item,index) => 
            (
              <img key={index} className="rounded-lg w-full h-16 sm:h-24" src={item.imageLink} alt="" loading="lazy"/>
            )
            )}
          </div>

          <div className="w-4/5 h-auto">
            <img
              loading="lazy"
              className=" rounded-lg h-full xl:h-auto w-full"
              src={product.images[0].imageLink}
              alt=""
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 text-left">
          <h1 className="text-3xl py-3">{product.productName}</h1>
          <h3 className=" text-gray-400">
            {numeral(product.price).format("0,0")} đ
          </h3>
          <div className="flex gap-1 text-yellow-300 w-full items-center py-3">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt />
            <RxDividerVertical className="text-gray-400 text-3xl" />
            <span className="text-gray-400">5 Customer Review</span>
          </div>
          <p className="w-5/6 text-sm md:text-md">
            Setting the bar as one of the loudest speakers in its class, the
            Kilburn is a compact, stout-hearted hero with a well-balanced audio
            which boasts a clear midrange and extended highs for a sound.
          </p>

          <SizePicker onChange={handleSize} />

          <ColorPicker onChange={handleColor} />

          <div className="pt-5 flex items-center justify-between w-full xl:w-11/12 text-sm md:text-base relative">
            <div className="w-16 sm:w-28 lg:w-16 xl:w-28 h-10 sm:h-14 lg:h-10 xl:h-14 border-2 border-gray-400 rounded-lg">
              <button
                type="button"
                className="w-1/4 h-full outline-none active:bg-gray-100 rounded-l-lg"
                onClick={(e) => handleMinus(e)}
              >
                -
              </button>

              <input
                type="text"
                className="w-2/4 outline-none text-center"
                value={quantity}
                onChange={(e) => handleTypeQuantity(e.target.value)}
              />
              <button
                type="button"
                className="w-1/4 h-full outline-none active:bg-gray-100 rounded-r-lg"
                onClick={handlePlus}
              >
                +
              </button>
            </div>

            <Button
              className="border-2 border-slate-900 rounded-xl px-4 h-10 sm:px-12 lg:px-6 xl:px-12 sm:h-14 lg:h-10 xl:h-14 "
              title="Add to cart"
              onClick={() => handleAddToCart(product)}
            />

            <Button
              className="border-2 border-slate-900 rounded-xl px-4 h-10 sm:px-12 lg:px-6 xl:px-12 sm:h-14 lg:h-10 xl:h-14 "
              title="+ Compare"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-start w-5/12 mx-auto lg:mr-20 my-8">
        <hr className="w-5/6" />
      </div>

      <div className="flex mx-auto justify-center lg:justify-end mb-5 w-9/12 gap-10 text-gray-400">
        <div className="flex flex-col text-left gap-3">
          <h5>SKU</h5>
          <h5>Category</h5>
          <h5>Tags</h5>
          <h5>Share</h5>
        </div>

        <div className="flex flex-col text-left gap-3">
          <span className="flex gap-5">
            : <span>SS001</span>
          </span>
          <span className="flex gap-5">
            : <span>Sofas</span>
          </span>
          <span className="flex gap-5">
            : <span>Sofa, Chair, Home, Shop</span>
          </span>
          <span className="flex gap-5">
            :
            <span className="flex gap-4 items-center text-black">
              <FaFacebook />
              <FaLinkedin />
              <FaSquareXTwitter />
            </span>
          </span>
        </div>
      </div>

      <hr className="my-16" />

      <Description />

      <hr className="my-16" />

      <div>
        <h1 className="text-3xl font-semibold">Related Products</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-11/12 justify-around mx-auto my-5">
          {products
            .filter(
              (item) =>
                item.subCategoryId === product.subCategoryId &&
                item.productId !== product.productId
            )
            .slice(0, 4)
            .map((item, index) => {
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
      </div>
    </>
  );
};

export default ProductDisplay;
