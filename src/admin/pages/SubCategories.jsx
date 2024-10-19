import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

import { RxSlash } from "react-icons/rx";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

import List from "../components/List";
import Forms from "../components/SubCategories/Forms";
import { subCategoriesAPI } from "../modules/api/api";
import ReactPaginate from "react-paginate";

const SubCategories = () => {
  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValue: {
      subCategoryId: "",
      subCategoryName: "",
      categoryId: "",
    },
  });

  const [subCategories, setSubCategories] = useState([]);
  const [addForm, setAddForm] = useState(false);
  const [edit, setEdit] = useState();
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const subCategoriesPerPage = 10;

  const subCategoryTitle = useMemo(
    () => ["#", "SubCategory Name", "Category Name", "Actions"],
    []
  );

  useEffect(() => {
    renderSubCategories();
  }, []);

  const renderSubCategories = () => {
    subCategoriesAPI()
      .GET()
      .then((res) => {
        setSubCategories(res.data);
        setPageCount(Math.ceil(res.data.length / subCategoriesPerPage));
        setLoading(true);
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    subCategoriesAPI()
      .POST(data)
      .then((res) => {
        renderSubCategories();
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

    subCategoriesAPI()
      .PUT(data.subCategoryId, data)
      .then((res) => {
        renderSubCategories();
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
    })
      .then((willDelete) => {
        if (willDelete) {
          subCategoriesAPI()
            .DELETE(data.subCategoryId)
            .then((res) => {
              renderSubCategories();
              swal(`Delete ${data.subCategoryName} successfully`, {
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
  };

  const offset = currentPage * subCategoriesPerPage;
  const currentSubCategories = subCategories.slice(
    offset,
    offset + subCategoriesPerPage
  );

  return (
    <div className="pt-12">
      <div className="w-1/4 flex items-center ml-12 text-lg">
        <span>Management</span>
        <RxSlash className="mx-1" />
        <span>Employees</span>
      </div>

      <div className="w-40 my-8 ml-10">
        <button
          onClick={() => {
            setAddForm(true);
          }}
          className="p-3 bg-slate-800 text-white rounded-xl"
        >
          SubCategory +
        </button>
      </div>

      {loading ? (
        <>
          <List
            listTitle={subCategoryTitle}
            listItem={currentSubCategories}
            render={(subCategory, index) => (
              <>
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{subCategory.subCategoryName}</td>
                <td className="p-3">{subCategory.categoryName}</td>
                <td className="flex gap-2 text-xl p-3 justify-center">
                  <button>
                    <FaRegEdit
                      onClick={() => {
                        showEdit(subCategory);
                        setAddForm(true);
                      }}
                    />
                  </button>
                  <button>
                    <FaRegTrashAlt onClick={(e) => onDelete(subCategory, e)} />
                  </button>
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
          updateFunc={onUpdate}
          submitFunc={onSubmit}
          closeForm={closeForm}
          edit={edit}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          addForm={addForm}
        />
      )}
    </div>
  );
};

export default SubCategories;
