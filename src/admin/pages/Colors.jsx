import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import swal from 'sweetalert';

import { RxSlash } from "react-icons/rx";

import List from "../components/Colors/List";
import Forms from "../components/Colors/Forms";

const Categories = (props) => {

  const {reset,register,setValue,handleSubmit,formState: { errors }
} = useForm({
    defaultValue: {
      colorId: "",
      colorName: "",
      colorHexCode: "",
    },
  });

  const [categoryList, setCategoryList] = useState([]);
  const [addForm, setAddForm] = useState(false);
  const [edit, setEdit] = useState();
  const [isColored, setIsColored] = useState();

  useEffect(() => {
    renderColors();
  }, []);

  const colorAPI = (url = "https://localhost:7183/api/Colors/") => {
    return {
      GET: () => axios.get(url),
      POST: (newData) => axios.post(url, newData),
      PUT: (id, updateData) => axios.put(url + id, updateData),
      DELETE: (id) => axios.delete(url + id),
    };
  };

  const renderColors = () => {
    colorAPI()
      .GET()
      .then((res) => {setCategoryList(res.data)})
      .catch((err) => console.log(err));
  };


  const showEdit = (data) => {
    setEdit(data);
    setValue("colorId", data.colorId);
    setValue("colorName", data.colorName);
    setValue("colorHexCode",data.colorHexcode);
    setIsColored(data.colorHexcode);
  };

  const postAPI = async (data) => {
    colorAPI()
      .POST(data)
      .then((res) => {
        renderColors();
      })
      .catch((err) => console.log(err));

    reset();
    setAddForm(false);
  };

  const putAPI = async (data) => {
    colorAPI()
      .PUT(data.colorId, data)
      .then((res) => {
        renderColors();
      })
      .catch((err) => console.log(err));

    setAddForm(false);
    setEdit(null);
  };

  const deleteAPI = async (data) => {
    await swal({
      title: "Are you sure?",
      text: `Delete ${data.colorName} ?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if(willDelete){
        colorAPI()
        .DELETE(data.colorId)
        .then((res) => {
          renderColors();
          swal(`Delete ${data.colorName} successfully`, {
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
        <span>Colors</span>
      </div>

      <div className="w-40 my-8 ml-4">
        <button
          onClick={() => setAddForm(true)}
          className="p-3 bg-slate-800 text-white rounded-xl"
        >
          Color +
        </button>
      </div>

      <List
        listData={categoryList}
        show={showEdit}
        formAdd={setAddForm}
        deleteAPI={deleteAPI}
      />

      {addForm && (
        <Forms
          putAPI={putAPI}
          postAPI = {postAPI}
          closeForm = {closeForm}
          edit = {edit}
          register={register}
          errors={errors}
          handleSubmit = {handleSubmit}
          isColored ={isColored}
        />
      )}
    </div>
  );
};

export default Categories;
