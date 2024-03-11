import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";

import { ShopContext } from "../../context/ShopContext";
import {
  productAPI,
  imageAPI,
} from "../modules/api/api";

import defaultImg from "../assets/images/default_img.png";
import ProductSubDetail from "../components/Product/ProductSubDetail";

const Product = () => {
  const { products, categories, subCategories } = useContext(ShopContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const [img, setImg] = useState("");
  const [subImgs, setSubImgs] = useState(Array(4).fill(defaultImg));
  const [subUpload, setSubUpload] = useState(Array(4).fill(null));

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const getProduct = async () => {
    await productAPI()
      .GET(productId)
      .then((res) => {
        setProduct(res.data);
        setImg(res.data.images[0].imageLink);
      })
      .catch((err) => console.log(err));
  };

  const renderSubImage = async () => {
    imageAPI()
      .GET(productId)
      .then((res) => {
        setSubImgs(
          res.data.map((file, index) => {
            subImgs[index] = file.imageLink;
            return subImgs[index];
          })
        );
      })
      .catch((err) => console.log(err));
  };

  const showDetail = () => {
    if (product != null) {
      setValue("productId", productId);
      setValue("productName", product.productName);
      setValue("price", product.price);
      setValue("description", product.description);
      setValue("imageFile", product.imageSrc);
      setValue("subCategoryId", product.subCategoryId);
    }
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      URL.revokeObjectURL(img);
      let file = e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImg(imageUrl);
      }
    }
  };

  const showSubPreview = (e, index) => {
    if (e.target.files && e.target.files[0]) {
      URL.revokeObjectURL(subImgs[index]);
      let file = e.target.files[0];
      if (file) {
        setSubImgs((prev) => {
          const newImgs = [...prev];
          newImgs[index] = URL.createObjectURL(file);
          return newImgs;
        });

        setSubUpload((prev) => {
          const newUploads = [...prev];
          newUploads[index] = file;
          return newUploads;
        });
      }
    }
  };

  const uploadSubImgs = () => {
    if (subUpload.every((item) => item === null)) {
      return;
    }

    const formData = new FormData();
    formData.append(`productId`, productId);
    subUpload.forEach((file) => {
      if (file !== null) {
        formData.append("imageFiles", file);
      }
    });

    imageAPI()
      .POST(formData)
      .then((res) => renderSubImage())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProduct();
    renderSubImage();
  }, []);

  useEffect(() => {
    showDetail();
  }, [products, product]);

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
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {product && products.length > 0 ? (
        <>
          {/* Note: Tách 1 component  */}
          <div className="mt-16 w-4/5 mx-auto">
            <form
              className="flex justify-between"
              onSubmit={handleSubmit(onEdit)}
            >
              <div className="flex flex-col gap-2">
                <label>
                  <img className="w-96 h-96" src={img} alt="" />
                  <input
                    type="file"
                    className="sr-only"
                    {...register("imageFile", {
                      required: false,
                      onChange: (e) => showPreview(e),
                    })}
                  />
                </label>
                <div className="flex items-center justify-between">
                  {subImgs.map((item, index) => (
                    <label key={index}>
                      <input
                        className="sr-only"
                        type="file"
                        onChange={(e) => showSubPreview(e, index)}
                      />
                      <img className="w-20 h-20" src={item} alt="" />
                    </label>
                  ))}

                  {subImgs.length < 4 &&
                    [...Array(4 - subImgs.length)].map((item, index) => (
                      <label key={subImgs.length + index}>
                        <input
                          className="sr-only"
                          type="file"
                          onChange={(e) =>
                            showSubPreview(e, subImgs.length + index)
                          }
                        />
                        <img className="w-20 h-20" src={defaultImg} alt="" />
                      </label>
                    ))}
                </div>
                <div className="flex justify-end my-2">
                  <button
                    type="button"
                    onClick={() => uploadSubImgs()}
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

                {/* Note: 1 component */}
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

          <ProductSubDetail productId={productId}/>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Product;
