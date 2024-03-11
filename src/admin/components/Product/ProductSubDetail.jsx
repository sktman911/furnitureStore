import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { productSizeColorAPI, sizeAPI, colorAPI } from "../../modules/api/api";

import { IoClose } from "react-icons/io5";

export default function ProductSubDetail(props) {
    const [productSizeColor, setProductSizeColor] = useState(null);
    const [size, setSize] = useState(null);
    const [color, setColor] = useState(null);
    const [open,setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();

  useEffect(() => {
    getProductSizeColor();
  }, []);

  const getProductSizeColor = async () => {
    await productSizeColorAPI()
      .GET(props.productId)
      .then((res) => {
        setProductSizeColor(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getSize = async () => {
    await sizeAPI()
      .GET()
      .then((res) => {
        setSize(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getColor = async () => {
    await colorAPI()
      .GET()
      .then((res) => {
        setColor(res.data);
      })
      .catch((err) => console.log(err));
  };

  
  const hanldeProductDetail = () => {
    getSize();
    getColor();
    setOpen(true);
  };

  const handleSubmitProductDetail = async (data) => {
    const dataForm = {
      productId: props.productId,
      sizeId: data.productSize,
      quantity: data.productQuantity,
      colorId: data.productColor,
    };

    productSizeColorAPI()
      .POST(dataForm)
      .then((res) => getProductSizeColor())
      .catch((err) => console.log(err));

    closeForm();
  };

  const closeForm = () => {
    setOpen(false);
    reset({productSize: '',productColor: '', productQuantity: ''})
  };

  return (
    <>
      {/* Data table */}
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
        <div className="p-5 my-5 text-lg bg-yellow-50 rounded-lg drop-shadow-lg">
          {productSizeColor &&
            productSizeColor.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between my-2"
              >
                <span className="w-6">{index + 1}/</span>
                <div className="flex items-center gap-10">
                  <label>Size: </label>
                  <p className="border-2 py-1 px-3 w-14 rounded-lg">
                    {item.sizeName}
                  </p>
                </div>
                <div className="flex items-center gap-10">
                  <label>Color: </label>
                  <p
                    className="w-8 h-8 rounded-full border-2"
                    style={{ background: item.colorName }}
                  ></p>
                </div>
                <div className="flex items-center gap-10">
                  <label>Quantity: </label>
                  <p className="border-2 py-1 px-3 w-14 rounded-lg">
                    {item.quantity}
                  </p>
                </div>
                <div></div>
              </div>
            ))}
        </div>
      </div>
      {/* End data table  */}

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
                  {...register("productSize", {
                    required: "Please choose size",
                  })}
                >
                  <option value="">Choose Size</option>
                  {size &&
                    size.map((item, index) => (
                      <option key={index} value={item.sizeId}>
                        {item.sizeName}
                      </option>
                    ))}
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
                  {...register("productQuantity", {
                    required: "Please fill quantity !",
                    validate: (value) =>
                      (!isNaN(value) && value >= 5) || "Invalid quantity",
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
                <select
                  className="py-1 px-3 w-3/5 h-full border-b focus:outline-none
                    focus:border-black"
                  {...register("productColor", {
                    required: "Please choose color !",
                  })}
                >
                  <option value="">Choose Color</option>
                  {color &&
                    color.map((item, index) => (
                      <option key={index} value={item.colorId}>
                        {item.colorName}
                      </option>
                    ))}
                </select>
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
  );
}
