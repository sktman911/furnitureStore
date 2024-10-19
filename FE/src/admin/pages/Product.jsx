import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";

import { ShopContext } from "../../context/ShopContext";
import { productAPI } from "../modules/api/api";

import ProductSubDetail from "../components/Product/ProductSubDetail";
import ProductSubImage from "../components/Product/ProductSubImage";
import { successMessage } from "../../constants/message";

const Product = () => {
  const { categories, subCategories } = useContext(ShopContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm();

  const getProduct = async () => {
    await productAPI()
      .GET_ID(productId)
      .then((res) => {
        setProduct(res.data);
        showDetail(res.data);
        setImage(res.data.images[0].imageLink);     
      })
      .catch((err) => console.log(err));
  };

  const showDetail = (product) => {
    setValue("productId", productId);
    setValue("productName", product.productName);
    setValue("price", product.price);
    setValue("description", product.description);
    setValue("imageFile", product.images[0].imageLink);
    setValue("subCategoryId", product.subCategoryId);
    setValue("sale", product.sale);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const onEdit = async (data) => {
    const formData = new FormData();
    formData.append("productId", data.productId);
    formData.append("productName", data.productName);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("subCategoryid", data.subCategoryId);
    formData.append("sale", data.sale);
    console.log(data)
    productAPI()
      .PUT(data.productId, formData)
      .then((res) => {
        setProduct(res.data);
        successMessage("Updated Successfully");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {product !== null ? (
        <>
          {/* Note: Tách 1 component  */}
          <div className="mt-16 w-4/5 mx-auto">
            <form
              className="flex justify-between"
              onSubmit={handleSubmit(onEdit)}
            >
              <div className="flex flex-col gap-2">
                <label>
                  <img className="w-96 h-96" src={image} alt="" />
                </label>
                <ProductSubImage product={product} reRender={getProduct} setImage={setImage}/>
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
                    <label className="block w-fit py-2">Price (VND): </label>
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

                {/* Note: 1 component */}
                <div className="pb-4 flex gap-5 items-center">
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

                  <div className="text-left">
                    <label className="block w-fit py-2">Sale (%): </label>
                    <input
                      type="text"
                      className="py-1 px-2 border-2 rounded-md"
                      {...register("sale", { 
                        validate: (value) => !isNaN(value) || "Invalid value",
                        min:{value: 1, message: "Invalid value"},
                        max: {value: 70 , message: "Value must be less than 70"},
                        onBlur: () => trigger("sale"),
                      })}
                    />
                    {errors.sale && <p className="text-red-600">{errors.sale.message}</p>}
                  </div>
                </div>
                {/* End note */}

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
          {/* End note */}

          <ProductSubDetail productId={productId} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Product;
