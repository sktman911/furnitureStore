import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert"

import { RxSlash } from "react-icons/rx";

import List from "../components/SubCategories/List";
import Forms from "../components/SubCategories/Forms";

const SubCategories = (props) => {
  const {reset,register,setValue,handleSubmit,formState: { errors }
} = useForm({
    defaultValue: {
        subCategoryId: "",
        subCategoryName: "",
        categoryId: ""
    },
  });

  const [subCategoryList, setSubCategoryList] = useState([]);
  const [addForm, setAddForm] = useState(false);
  const [edit, setEdit] = useState();


  useEffect(() => {
    renderSubCategoryList();
  }, []);

  const subCategoryAPI = (url = "https://localhost:7183/api/SubCategories/") => {
    return {
      GET: () => axios.get(url),
      POST: (newData) => axios.post(url, newData),
      PUT: (id, updateData) => axios.put(url + id, updateData),
      DELETE: (id) => axios.delete(url + id),
    };
  };

  const renderSubCategoryList = () => {
    subCategoryAPI()
      .GET()
      .then((res) => setSubCategoryList(res.data))
      .catch((err) => console.log(err));
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    subCategoryAPI()
      .POST(data)
      .then((res) => {
        renderSubCategoryList();
      })
      .catch((err) => console.log(err));

    reset();
    setAddForm(false);
  };

  const showEdit = (data) => {
    setEdit(data);
    setValue("subCategoryId", data.subCategoryId);
    setValue("subCategoryName", data.subCategoryName);
    setValue("categoryId", data.categoryId);
  };

  const onUpdate = async (data, e) => {
    e.preventDefault();

    subCategoryAPI()
      .PUT(data.subCategoryId, data)
      .then((res) => {
        renderSubCategoryList();
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
      text: `Delete ${data.subCategoryName} ?`,
      icon: "warning",
      buttons: [true, "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if(willDelete){
        subCategoryAPI()
        .DELETE(data.subCategoryId)
        .then((res) => {
          renderSubCategoryList();
          swal(`Delete ${data.subCategoryName} successfully`, {
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

      <div className="w-40 my-8 ml-10">
        <button
          onClick={() => {setAddForm(true)}}
          className="p-3 bg-slate-800 text-white rounded-xl"
        >
          SubCategory +
        </button>
      </div>

      <List
        listData={subCategoryList}
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

export default SubCategories;
