import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import swal from 'sweetalert';

import { RxSlash } from "react-icons/rx";
import {categoryAPI} from "../modules/api/api"

import List from "../components/Categories/List";
import Forms from "../components/Categories/Forms";

const Categories = () => {

  const {reset,register,setValue,handleSubmit,formState: { errors }
} = useForm({
    defaultValue: {
      categoryId: "",
      categoryName: "",
    },
  });

  const [categoryList, setCategoryList] = useState([]);
  const [addForm, setAddForm] = useState(false);
  const [edit, setEdit] = useState();

  useEffect(() => {
    renderCategories();
  }, []);

  const renderCategories = () => {
    categoryAPI()
      .GET()
      .then((res) => {setCategoryList(res.data)})
      .catch((err) => console.log(err));
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    categoryAPI()
      .POST(data)
      .then((res) => {
        renderCategories();
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

    categoryAPI()
      .PUT(data.categoryId, data)
      .then((res) => {
        renderCategories();
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
      text: `Delete ${data.categoryName} ?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if(willDelete){
        categoryAPI()
        .DELETE(data.categoryId)
        .then((res) => {
          renderCategories();
          swal(`Delete ${data.categoryName} successfully`, {
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
        <span>Employees</span>
      </div>

      <div className="w-40 my-8 ml-6">
        <button
          onClick={() => setAddForm(true)}
          className="p-3 bg-slate-800 text-white rounded-xl"
        >
          Category +
        </button>
      </div>

      <List
        listData={categoryList}
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
        />
      )}
    </div>
  );
};

export default Categories;
