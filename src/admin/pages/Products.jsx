import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import swal from 'sweetalert';

import { RxSlash } from "react-icons/rx";

import List from "../components/Products/List";
import Forms from "../components/Products/Forms";

const Products = (props) => {

  const {reset,register,setValue,handleSubmit,formState: { errors }
} = useForm({
    defaultValue: {
      productId: 0,
      productName: "",
      imageFile: "",
      price:0,
      description:"",
      subCategoryId: "",
    },
  });

  const [products, setProducts] = useState([]);
  const [addForm, setAddForm] = useState(false);
  const [edit, setEdit] = useState();

  useEffect(() => {
    renderProducts();
  }, []);

  const productAPI = (url = "https://localhost:7183/api/Products/") => {
    return {
      GET: () => axios.get(url),
      POST: (newData) => axios.post(url, newData),
      PUT: (id, updateData) => axios.put(url + id, updateData),
      DELETE: (id) => axios.delete(url + id),
    };
  };

  const renderProducts = () => {
    productAPI()
      .GET()
      .then((res) => {setProducts(res.data)})
      .catch((err) => console.log(err));
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('imageFile',data.imageFile[0])
    formData.append('productName',data.productName)
    formData.append('price',data.price)
    formData.append('description',data.description)
    formData.append('subCategoryid',data.subCategoryId)

    productAPI()
      .POST(formData)
      .then((res) => {
        renderProducts();
      })
      .catch((err) => console.log(err));

    reset();
    setAddForm(false);
  };

  const showEdit = (data) => {
    setEdit(data);
    setValue("categoryId", data.categoryId);
    setValue("categoryName", data.categoryName);
  };

  const onUpdate = async (data, e) => {
    e.preventDefault();

    productAPI()
      .PUT(data.categoryId, data)
      .then((res) => {
        renderProducts();
      })
      .catch((err) => console.log(err));

    reset();
    setEdit(null);
    setAddForm(false);
  };

  const onDelete = async (data, e) => {
    e.preventDefault();
    await swal({
      title: "Are you sure?",
      text: `Delete ${data.productName} ?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if(willDelete){
        productAPI()
        .DELETE(data.productId)
        .then((res) => {
            renderProducts();
          swal(`Delete ${data.productName} successfully`, {
            icon: "success",
          });     
        });
      }
    }).catch(err => console.log(err))     
  };

  const closeForm = () =>{
    setAddForm(false);
    reset();
    setEdit(null);
  }

  return (
    <div className="pt-12">
      <div className="w-1/4 flex items-center ml-12 text-lg">
        <span>Management</span>
        <RxSlash className="mx-1" />
        <span>Products</span>
      </div>

      <div className="w-40 my-8 ml-6">
        <button
          onClick={() => setAddForm(true)}
          className="p-3 bg-slate-800 text-white rounded-xl"
        >
          Product +
        </button>
      </div>

      <List
        listData={products}
        show={showEdit}
        formAdd={setAddForm}
        formDel={onDelete}
      />

      {addForm && (
        <Forms
          updateFunc={onUpdate}
          submitFunc={onSubmit}
          closeForm = {closeForm}
          edit = {edit}
          register={register}
          errors={errors}
          handleSubmit = {handleSubmit}
          addForm={addForm}
        />
      )}
    </div>
  );
};

export default Products;
