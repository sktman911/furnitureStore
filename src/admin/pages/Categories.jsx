import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

import { RxSlash } from "react-icons/rx";
import { categoryAPI } from "../modules/api/api";

import List from "../components/List";
import Forms from "../components/Categories/Forms";
import ReactPaginate from "react-paginate";

const Categories = () => {
  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValue: {
      categoryId: "",
      categoryName: "",
    },
  });

  const [categoryList, setCategoryList] = useState([]);
  const [addForm, setAddForm] = useState(false);
  const [edit, setEdit] = useState();
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const categoriesPerPage = 10;

  const categoryTitle = useMemo(() => ["#", "Category Name", "Actions"], []);

  useEffect(() => {
    renderCategories();
  }, []);

  const renderCategories = () => {
    categoryAPI()
      .GET()
      .then((res) => {
        setCategoryList(res.data);
        setPageCount(Math.ceil(res.data.length / categoriesPerPage));
        setLoading(true);
      })
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
    })
      .then((willDelete) => {
        if (willDelete) {
          categoryAPI()
            .DELETE(data.categoryId)
            .then((res) => {
              renderCategories();
              swal(`Delete ${data.categoryName} successfully`, {
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

  const offset = currentPage * categoriesPerPage;
  const currentCategories = categoryList.slice(
    offset,
    offset + categoriesPerPage
  );

  return (
    <div className="pt-12">
      <div className="w-1/4 flex items-center ml-12 text-lg">
        <span>Management</span>
        <RxSlash className="mx-1" />
        <span>Categories</span>
      </div>

      <div className="w-40 my-8 ml-6">
        <button
          onClick={() => setAddForm(true)}
          className="p-3 bg-slate-800 text-white rounded-xl"
        >
          Category +
        </button>
      </div>

      {loading ? (
        <>
          <List
            listTitle={categoryTitle}
            listItem={currentCategories}
            render={(category, index) => (
              <>
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{category.categoryName}</td>
                <td className="flex gap-2 text-xl p-3 justify-center">
                  <button>
                    <FaRegEdit
                      onClick={() => {
                        showEdit(category);
                        setAddForm(true);
                      }}
                    />
                  </button>
                  <button>
                    <FaRegTrashAlt onClick={(e) => onDelete(category, e)} />
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

      {/* Add form  */}
      {addForm && (
        <Forms
          updateFunc={onUpdate}
          submitFunc={onSubmit}
          closeForm={closeForm}
          edit={edit}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Categories;
