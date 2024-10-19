import React, { useCallback, useEffect, useMemo, useState } from "react";

import { FaStar, FaStarHalfAlt, FaFacebook, FaHeart } from "react-icons/fa";
import { RxDividerVertical } from "react-icons/rx";
import ColorPicker from "./ColorPicker";
import SizePicker from "./SizePicker";
import Button from "../Button";
import { FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";
import Description from "./Description";
import Review from "./Review";
import RelatedProducts from "../ProductDetail/RelatedProducts";

import { useDispatch, useSelector } from "react-redux";
import { errorMessage } from "../../constants/message";
import numeral from "numeral";
import { favouriteAPI } from "../../modules/apiClient";
import { useNavigate } from "react-router";
import useQuantity from "../../hooks/useQuantity";

const ProductDisplay = (props) => {
  const user = useSelector((state) => state.user);

  const { product } = props;
  const navigate = useNavigate();
  const { quantity, handlePlus, handleMinus, handleTypeQuantity } = useQuantity(
    1,
    1,
    99
  );

  const sum = useMemo(() => product.reviews.reduce((initial, item) => {
    return initial + item.rating;
  }, 0)
  ,[product.reviews]);

  const rating = useMemo(() => (sum / product.reviews.length).toFixed(1),[sum,product.reviews.length])

  const salePrice = useMemo(
    () =>
      product.sale !== null
        ? product.price - (product.price * product.sale) / 100
        : null,
    [product.price, product.sale]
  );

  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [hover, setHover] = useState(false);
  const [favor, setFavor] = useState({});
  const [active, setActive] = useState("Description");
  const dispatch = useDispatch();

  const subContents = useMemo(
    () => [
      { title: "Description" },
      { title: "Additional Information" },
      { title: "Review" },
    ],
    []
  );

  useEffect(() => {
    if (user) {
      const getFavourite = () => {
        favouriteAPI()
          .GET(user.cusId, product.productId)
          .then((res) => {
            setFavor(res.data);
          })
          .catch((err) => { if(err.response.status !== 400) console.log(err)});
      };
      getFavourite();
    }
  }, [product.productId, user]);

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

  const handleFavourite = useCallback(async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (favor.favouriteId) {
      const data = {
        favouriteId: favor.favouriteId,
        cusId: user?.cusId,
        productId: product.productId,
        isFavourite: favor.isFavourite,
      };
      await favouriteAPI()
        .PUT(favor.favouriteId, data)
        .then((res) => {
          setFavor(res.data);
        })
        .catch((err) => console.log(err));
      return;
    } else {
      const data = {
        favouriteId: 0,
        cusId: user?.cusId,
        productId: product.productId,
        isFavourite: true,
      };
      await favouriteAPI()
        .POST(data)
        .then((res) => setFavor(res.data))
        .catch((err) => console.log(err));
      return;
    }
  }, [product.productId, favor.favouriteId, favor.isFavourite, user, navigate]);

  const handleSize = useCallback((size) => {
    setSize(size);
  }, []);

  const handleColor = useCallback((color) => {
    setColor(color);
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-20 w-5/6 mx-auto py-10">
        <div className="flex gap-4 xl:gap-8 w-full lg:w-1/2">
          <div className="flex flex-col gap-12 xl:gap-6 w-1/6 h-fit justify-between my-1">
            {product.images.map((item, index) => (
              <img
                key={index}
                className="rounded-lg w-full h-16 sm:h-24"
                src={item.imageLink}
                alt=""
                loading="lazy"
              />
            ))}
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
          <div className=" text-gray-400 flex gap-6">
            <p className={` ${salePrice !== null ? "line-through" : null}`}>
              {numeral(product.price).format("0,0")} đ
            </p>
            {salePrice !== null ? (
              <p className="text-red-600">
                {numeral(salePrice).format("0,0")} đ{" "}
              </p>
            ) : null}
          </div>
          <div className="flex gap-1 text-yellow-300 w-full items-center py-3">
            {[...Array(5)].map((_, index) => {
              const isFull = index < Math.floor(rating);
              const isHalf = index === Math.floor(rating) && rating % 1 !== 0;
              const isEmpty = index > Math.floor(rating);

              return (
                <div key={index}>
                  {isFull && <FaStar className="text-yellow-300"/>}
                  {isHalf && <FaStarHalfAlt className="text-yellow-300"/>}
                  {isEmpty && <FaStar className="text-gray-400"/>}
                </div> 
              );
            })}

            <p className="text-black font-semibold pl-3">{rating}/5.0</p>
            <RxDividerVertical className="text-gray-400 text-3xl" />
            <span className="text-gray-400">
              {product.reviews.length} Customer Review
            </span>
            <div>
              <FaHeart
                className="w-6 h-6 hover:cursor-pointer text-red-500 ml-8"
                color={hover || favor.isFavourite === true ? "red" : "gray"}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => handleFavourite()}
              />
            </div>
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

      <div className="flex gap-10 text-sm md:text-lg justify-center">
        {subContents.map((content, index) => (
          <h1
            key={index}
            onClick={() => setActive(content.title)}
            className={
              active === content.title
                ? "font-bold cursor-pointer"
                : "text-gray-400 cursor-pointer"
            }
          >
            {content.title}
            {content.title === "Review" && <span>[{product.reviews.length}]</span>}
          </h1>
        ))}
      </div>

      {active === "Description" && <Description />}
      {active === "Review" && <Review product={product} />}

      <hr className="my-16" />

      <RelatedProducts product={product} />
    </>
  );
};

export default ProductDisplay;