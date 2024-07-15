import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

import { RxSlash } from "react-icons/rx";

import List from "../components/Colors/List";
import Forms from "../components/Colors/Forms";
import ReactPaginate from "react-paginate";
import { colorAPI } from "../modules/api/api";

const Colors = (props) => {
  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValue: {
      colorId: "",
      colorName: "",
      colorHexCode: "",
    },
  });

  const [colorList, setColorList] = useState([]);
  const [addForm, setAddForm] = useState(false);
  const [edit, setEdit] = useState();
  const [isColored, setIsColored] = useState();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const colorsPerPage = 10;

  useEffect(() => {
    renderColors();
  }, []);

  const renderColors = () => {
    colorAPI()
      .GET()
      .then((res) => {
        setColorList(res.data);
        setPageCount(Math.ceil(res.data.length / colorsPerPage));
      })
      .catch((err) => console.log(err));
  };

  const showEdit = (data) => {
    setEdit(data);
    setValue("colorId", data.colorId);
    setValue("colorName", data.colorName);
    setValue("colorHexCode", data.colorHexcode);
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
    })
      .then((willDelete) => {
        if (willDelete) {
          colorAPI()
            .DELETE(data.colorId)
            .then((res) => {
              renderColors();
              swal(`Delete ${data.colorName} successfully`, {
                icon: "success",
              });
            });
        }
      })
      .catch((err) => console.log(err));
  };

  const closeForm = () => {
    setAddForm(false);
    reset();
    setEdit(null);
  };

  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
    window.scrollTo(0, 0);
  };

  const offset = currentPage * colorsPerPage;
  const currentColors = colorList.slice(offset, offset + colorsPerPage);

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
        listData={currentColors}
        show={showEdit}
        formAdd={setAddForm}
        deleteAPI={deleteAPI}
      />

      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"flex w-1/2 mx-auto justify-between items-center mt-6"}
        activeLinkClassName="w-10 h-10 bg-slate-700 text-white"
        nextLinkClassName="px-4 py-2 border border-slate-700 border-2 rounded-xl hover:bg-slate-700 hover:text-white"
        previousLinkClassName={
          "px-4 py-2 border border-slate-700 border-2 rounded-xl hover:bg-slate-700 hover:text-white"
        }
        pageLinkClassName="block w-10 h-10 flex items-center justify-center rounded-md hover:bg-slate-700 hover:text-white cursor-pointer"
        breakLinkClassName={"cursor-text"}
        renderOnZeroPageCount={null}
      />

      {addForm && (
        <Forms
          putAPI={putAPI}
          postAPI={postAPI}
          closeForm={closeForm}
          edit={edit}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          isColored={isColored}
        />
      )}
    </div>
  );
};

export default Colors;
