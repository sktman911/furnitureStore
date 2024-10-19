import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

import { RxSlash } from "react-icons/rx";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import List from "../components/List";
import Forms from "../components/Colors/Forms";
import ReactPaginate from "react-paginate";
import { colorAPI } from "../modules/api/api";

const Colors = () => {
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
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const colorsPerPage = 10;

  const colorTitle = useMemo(() => ["#", "Name", "Color", "Actions"], []);

  useEffect(() => {
    renderColors();
  }, []);

  const renderColors = useCallback(() => {
    colorAPI()
      .GET()
      .then((res) => {
        setColorList(res.data);
        setPageCount(Math.ceil(res.data.length / colorsPerPage));
        setLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const showEdit = (data) => {
    setEdit(data);
    setValue("colorId", data.colorId);
    setValue("colorName", data.colorName);
    setValue("colorHexCode", data.colorHexcode);
    setIsColored(data.colorHexcode);
  };

  const postAPI = useCallback(async (data) => {
    colorAPI()
      .POST(data)
      .then((res) => {
        renderColors();
      })
      .catch((err) => console.log(err));
    reset();
    setAddForm(false);
  }, []);

  const putAPI = useCallback(async (data) => {
    colorAPI()
      .PUT(data.colorId, data)
      .then((res) => {
        renderColors();
      })
      .catch((err) => console.log(err));
    setAddForm(false);
    setEdit(null);
  }, []);

  const deleteAPI = useCallback(async (data) => {
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
  }, []);

  const closeForm = useCallback(() => {
    setAddForm(false);
    reset();
    setEdit(null);
  }, []);

  const handlePageClick = useCallback((e) => {
    setCurrentPage(e.selected);
  }, []);

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

      {loading ? (
        <>
          <List
            listTitle={colorTitle}
            listItem={currentColors}
            render={(color, index) => (
              <>
                <td>{index + 1}</td>
                <td className=" text-center">{color.colorName}</td>
                <td>
                  <div
                    className="w-12 h-12 rounded-full mx-auto my-2"
                    style={{ background: color.colorHexcode }}
                  ></div>
                </td>
                <td>
                  <div className="flex justify-center items-center gap-2 text-xl">
                    <button>
                      <FaRegEdit
                        onClick={() => {
                          showEdit(color);
                          setAddForm(true);
                        }}
                      />
                    </button>
                    <button>
                      <FaRegTrashAlt onClick={() => deleteAPI(color)} />
                    </button>
                  </div>
                </td>
              </>
            )}
          />

          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            marginPagesDisplayed={3}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={
              "flex w-1/2 mx-auto justify-between items-center mt-6"
            }
            activeLinkClassName="w-10 h-10 bg-slate-700 text-white"
            nextLinkClassName="px-4 py-2 border border-slate-700 border-2 rounded-xl hover:bg-slate-700 hover:text-white"
            previousLinkClassName={
              "px-4 py-2 border border-slate-700 border-2 rounded-xl hover:bg-slate-700 hover:text-white"
            }
            pageLinkClassName="block w-10 h-10 flex items-center justify-center rounded-md hover:bg-slate-700 hover:text-white cursor-pointer"
            breakLinkClassName={"cursor-text"}
            renderOnZeroPageCount={null}
          />
        </>
      ) : (
        <div>Loading...</div>
      )}

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
