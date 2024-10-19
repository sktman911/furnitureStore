import { React, useEffect, useState } from "react";

import { IoClose } from "react-icons/io5";

import defaultImg from "../../assets/images/default_img.png";
import { imageAPI } from "../../modules/api/api";

const ProductSubImage = (props) => {
  const [imgs, setImgs] = useState([]);
  const [imgIds, setImgIds] = useState([]);
  const [subUpload, setSubUpload] = useState([]);
  const [uploadPreview, setUploadPreview] = useState([]);

  const [changed, setChanged] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setImgs(props.product.images);
  },[props.product.images])

  const showSubPreview = (e, index) => {
    if (e.target.files && e.target.files[0]) {
      URL.revokeObjectURL(imgs[index].imageLink);
      let file = e.target.files[0];
      if (file) {
        setImgs((prev) => {
          const newImgs = [...prev];
          newImgs[index].imageLink = URL.createObjectURL(file);
          return newImgs;
        });

        if(index === 0){
          props.setImage(URL.createObjectURL(file));
        }

        setSubUpload((prev) => {
          const newUploads = [...prev];
          newUploads[index] = file;
          return newUploads;
        });

        setImgIds((prev) => {
          const ids = [...prev];
          ids[index] = imgs[index].imageId;
          return ids;
        });

        setChanged(true);
      }
    }
  };

  const showUploadPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      if(uploadPreview.length > 0){
        uploadPreview.forEach(file => URL.revokeObjectURL(file));
      }
      const fileList = e.target.files;
      if(fileList.length > 4){
        e.target.value = null;
        setUploadPreview([]);
        return;
      }     
      const arr = Array.from(fileList);
      const files = arr.map((file) => URL.createObjectURL(file));
      setUploadPreview(files);
      const uploads = arr.map((file) => file);
      setSubUpload(uploads);
    }
  };

  // event for handle upload sub images by click 
  const uploadSubImgs = async () => {
    if (subUpload.length === 0) {
      setSubUpload([]);
      return;
    }

    if(imgs.length + subUpload.filter(item => item !== null).length > 4){
      console.log("Max exist 4 images");
      setSubUpload([]);
      return;
    }

    const formData = new FormData();
    formData.append(`productId`, props.product.productId);
    subUpload.forEach((file) => {
      if (file !== null) {
        formData.append("imageFiles", file);
      }
    });

    await imageAPI()
      .POST(formData)
      .then((res) => {props.reRender();})
      .catch((err) => console.log(err));

    setSubUpload([]);
    setOpen(false);
    setUploadPreview([]);
  };

  const editSubImgs = async () => {
    if(changed === false){
      return;
    }

    const formData = new FormData();
    formData.append(`productId`, props.product.productId);
    subUpload.forEach((file) => {
      if (file != null) {
        formData.append("imageFiles", file);
      }
    });

    imgIds.forEach((id) => {
      if (id != null) {
        formData.append("ids", id);
      }
    });

    await imageAPI()
      .PUT(props.product.productId, formData)
      .then((res) => {props.reRender();})
      .catch((err) => console.log(err));

    setSubUpload([]);
  }

  const openForm = () => {
    setSubUpload([]);
    setOpen(true);
  }

  const closeForm = () => {
    setOpen(false);
    setSubUpload([]);
    setUploadPreview([]);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        {imgs.map((item, index) => (
          <label key={index}>
            <input
              className="sr-only"
              type="file"
              onChange={(e) => showSubPreview(e, index)}
            />
            <img className="w-20 h-20" src={item.imageLink} alt="" />
          </label>
        ))}

        {imgs.length < 4 &&
          [...Array(4 - imgs.length)].map((item, index) => (
            <label key={imgs.length + index}>
              <img className="w-20 h-20" src={defaultImg} alt="" />
            </label>
          ))}
      </div>
      <div className="flex justify-end my-2">
        <button
          type="button"
          onClick={()=> editSubImgs()}
          className="px-2 py-1 border-2 border-black rounded-lg hover:bg-slate-800 hover:text-white"
        >
          Change
        </button>
        <button
          type="button"
          onClick={() => openForm()}
          className="px-2 ms-2 py-1 border-2 border-black rounded-lg hover:bg-slate-800 hover:text-white"
        >
          Image +
        </button>
      </div>

      {/*Add Image Form */}
      {open === true && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => closeForm()}
          ></div>
          <div
            className="w-2/4 bg-white rounded-md mx-auto p-4 shadow-lg fixed top-1/2
         -translate-y-1/2 left-2/4 -translate-x-2/4 z-50"
          >
            <h1 className="font-semibold text-2xl py-4">SubImage</h1>
            <IoClose
              onClick={() => closeForm()}
              className="absolute text-2xl top-3 right-4 cursor-pointer"
            />
            <div className="flex justify-around items-center pt-8 pb-2 w-4/5 mx-auto">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => showUploadPreview(e)}
                className="py-1 px-3 w-3/5 h-full file:border-none file:px-4 file:py-2 file:rounded-full 
              file:bg-gray-300 file:cursor-pointer cursor-pointer bg-gray-300 rounded-full file:text-black
              file:hover:text-white file:active:text-black"
              />
            </div>
            <div className="flex">
              {uploadPreview !== null &&
                uploadPreview.map((file, index) => (
                  <img
                    key={index}
                    className="w-40 h-40 px-2 py-1"
                    src={file}
                    alt=""
                  />
                ))}
            </div>
            <button
              type="button"
              onClick={() => uploadSubImgs()}
              className="p-3 bg-slate-800 text-white rounded-lg my-5"
            >
              Add SubImage
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ProductSubImage;
