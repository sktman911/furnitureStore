import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";

import { ShopContext } from "../../context/ShopContext";
import axios from "axios";

const Product = () => {
  const { products, categories, subCategories } = useContext(ShopContext);
  const { productId } = useParams();
  // const product = products.find((e) => e.productId === Number(productId));
  const [apiProduct, setApiProduct] = useState(null);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const showDetail = () => {
    setValue("productId", apiProduct.productId);
    setValue("productName", apiProduct.productName);
    setValue("price", apiProduct.price);
    setValue("description", apiProduct.description);
    setValue("imageFile", apiProduct.imageSrc);
    setValue("subCategoryId", apiProduct.subCategoryId);
  };

  useEffect(() => {
    getProduct();
    const time = setTimeout(() => {
      showDetail();
    }, 1000);

    return () => clearTimeout(time);
  }, [products]);

  const productAPI = (url = "https://localhost:7183/api/Products/") => {
    return {
      GET: (id) => axios.get(url + id),
      PUT: (id, data) => axios.put(url + id, data),
    };
  };

  const getProduct = async () => {
    productAPI()
      .GET(productId)
      .then((res) => {
        setApiProduct(res.data);
      })
      .catch((err) => console.log(err));
  };

  const onEdit = async (data) => {
    const formData = new FormData();
    formData.append("productId", data.productId);
    formData.append("imageFile", data.imageFile);
    formData.append("productName", data.productName);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("subCategoryid", data.subCategoryId);
    productAPI()
      .PUT(data.productId, formData)
      .then((res) => getProduct())
      .catch((err) => console.log(err));
  };

  const hanldeProductDetail = () => {
    setValue("productSize", "");
    setValue("productColor","");
    setValue("productQuantity","");
    setOpen(true);
  }

  const handleSubmitProductDetail = async (data) => {
    const dataForm ={ 
      productSize: data.productSize,
      productQuantity: data.productQuantity
    }

    console.log(dataForm)
  }

  const closeForm = () => {
    setOpen(false);
    reset({"productSize" : ""});
    reset({"productColor" : ""});
    reset({"productQuantity" : ""});
  }

  return (
    <>
      {apiProduct ? (
        <>
          <div className="mt-16 w-4/5 mx-auto">
            <form
              className="flex justify-between"
              onSubmit={handleSubmit(onEdit)}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="imgPreview">
                  <img
                    className="w-96 h-96"
                    src={apiProduct.images[0].imageLink}
                    alt=""
                  />
                  <input
                    id="imgPreview"
                    type="file"
                    hidden
                    {...register("imageFile", { required: false })}
                  />
                </label>
                <div className="flex items-center justify-between">
                  <img
                    className="w-20 h-20"
                    src={apiProduct.imageLink}
                    alt=""
                  />
                  <img
                    className="w-20 h-20"
                    src={apiProduct.imageLink}
                    alt=""
                  />
                  <img
                    className="w-20 h-20"
                    src={apiProduct.imageLink}
                    alt=""
                  />
                  <img
                    className="w-20 h-20"
                    src={apiProduct.imageLink}
                    alt=""
                  />
                </div>
                <div className="flex justify-end my-2">
                  <button
                    type="button"
                    className="px-2 py-1 border-2 border-black rounded-lg hover:bg-slate-800 hover:text-white"
                  >
                    Image +
                  </button>
                </div>
              </div>

              <div>
                <div className="flex gap-5 pt-2 pb-4 items-center">
                  <div className="text-left">
                    <label className="block w-fit py-2">Product Name:</label>
                    <input
                      type="text"
                      className="py-1 px-2 border-2 rounded-md"
                      {...register("productName", {
                        required: "Please fill name",
                      })}
                    />
                    {errors.productName && <p>{errors.productName.message}</p>}
                  </div>
                  <div className="text-left">
                    <label className="block w-fit py-2">Price ($): </label>
                    <input
                      type="text"
                      className="py-1 px-2 border-2 rounded-md"
                      {...register("price", {
                        required: "Please fill price",
                      })}
                    />
                    {errors.price && <p>{errors.price.message}</p>}
                  </div>
                </div>

                <div className="pb-4 ">
                  <div className="text-left w-1/2">
                    <label className="block w-fit py-2">SubCategory: </label>
                    <select
                      className="py-1 px-2 border-2 rounded-md w-full"
                      {...register("subCategoryId", {
                        required: "Please choose SubCategory",
                      })}
                    >
                      {categories.map((item, index) => (
                        <optgroup key={index} label={item.categoryName}>
                          {subCategories
                            .filter((e) => e.categoryId === item.categoryId)
                            .map((subItem, index) => (
                              <option key={index} value={subItem.subCategoryId}>
                                {subItem.subCategoryName} - {item.categoryName}
                              </option>
                            ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="">
                  <label className="block w-fit py-1">Description: </label>
                  <textarea
                    className="border-2 rounded-md w-full resize-none p-1"
                    rows="10"
                    {...register("description", { required: false })}
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="my-2 py-1 px-3 border-2 border-black rounded-lg hover:bg-slate-800 hover:text-white"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="my-6 w-4/5 mx-auto">
            <hr className="mb-6 border-2 border-black rounded-full" />
            <div className="flex justify-start">
              <button
                onClick={() => hanldeProductDetail()}
                className="p-2 border-2 border-black rounded-xl hover:bg-slate-800 hover:text-white"
              >
                Add Product Detail +
              </button>
            </div>
            <div className="p-5 my-5 flex items-center justify-between text-lg bg-yellow-50 rounded-lg drop-shadow-lg">
              <span>1/</span>
              <div className="flex items-center gap-10">
                <label>Size: </label>
                <p className="border-2 py-1 px-3 rounded-lg">M</p>
              </div>
              <div className="flex items-center gap-10">
                <label>Color: </label>
                <p>Purple</p>
              </div>
              <div className="flex items-center gap-10">
                <label>Quantity: </label>
                <p className="border-2 py-1 px-3 rounded-lg">30</p>
              </div>
            </div>
          </div>

          {open === true && (
            <>
              <div
                className="fixed inset-0 bg-black opacity-50 z-40"
                onClick={closeForm}
              ></div>
              <form
                onSubmit={handleSubmit(handleSubmitProductDetail)}
                className="w-2/4 bg-white rounded-md mx-auto p-4 shadow-lg fixed top-1/2
                  -translate-y-1/2 left-2/4 -translate-x-2/4 z-50"
              >
                <h1 className="font-semibold text-2xl py-4">Product Detail</h1>
                <IoClose
                  className="absolute text-2xl top-3 right-4 cursor-pointer"
                  onClick={closeForm}
                />
                {/* Form input */}
                <div className="flex items-center pt-8">
                  <div className="inline pb-2 w-1/2 mx-auto">
                    <label>Size: </label>
                    <select
                    className="py-1 px-3 w-3/5 h-full border-b focus:outline-none
                    focus:border-black"
                      {...register("productSize", {required: false,})}
                    >
                      <option value="">Choose Size</option>
                    </select>
                    {errors.productSize && (
                      <p className="w-2/4 text-red-600 text-center mx-auto">
                        {errors.productSize.message}
                      </p>
                    )}
                  </div>

                  <div className="inline pb-2 w-1/2 mx-auto">
                    <label>Quantity: </label>
                    <input
                      type="text"
                      className="py-1 px-3 w-3/5 h-full border-b focus:outline-none
                    focus:border-black"
                      {...register("productQuantity", {required: "Please fill quantity !",
                        validate: (value) =>(!isNaN(value) && value >= 5) || "Invalid quantity",
                      })}
                    />
                    {errors.productQuantity && (
                      <p className="w-2/4 my-2 text-red-600 text-center mx-auto">
                        {errors.productQuantity.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-start items-center pt-8">
                  <div className="inline pb-2 w-1/2 ">
                    <label>Color: </label>
                    <input type="color" 
                    className="px-2 w-3/5"
                    {...register("productColor",{required: "Please choose color !"})}
                    />
                    {errors.productColor && (
                      <p className="w-2/4 text-red-600 text-right mx-auto">
                        {errors.productColor.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* End form input */}

                <button
                  type="submit"
                  className="p-3 bg-slate-800 text-white rounded-lg my-5"
                >
                  Add Product Detail
                </button>
              </form>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Product;
