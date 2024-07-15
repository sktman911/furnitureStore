import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

import { RxSlash } from "react-icons/rx";

import List from "../components/Products/List";
import Forms from "../components/Products/Forms";
import { productAPI } from "../modules/api/api";
import ReactPaginate from "react-paginate";

const Products = (props) => {
  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValue: {
      productId: 0,
      productName: "",
      imageFile: "",
      price: 0,
      description: "",
      subCategoryId: "",
    },
  });

  const [products, setProducts] = useState([]);
  const [addForm, setAddForm] = useState(false);
  const [edit, setEdit] = useState();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const productsPerPage = 10;

  useEffect(() => {
    renderProducts();
  }, []);

  const renderProducts = () => {
    productAPI()
      .GET()
      .then((res) => {
        setProducts(res.data);
        setPageCount(Math.ceil(res.data.length / productsPerPage));
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("imageFile", data.imageFile[0]);
    formData.append("productName", data.productName);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("subCategoryid", data.subCategoryId);
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

  const onDelete = async (data, e) => {
    e.preventDefault();
    await swal({
      title: "Are you sure?",
      text: `Delete ${data.productName} ?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          productAPI()
            .DELETE(data.productId)
            .then((res) => {
              renderProducts();
              swal(`Delete ${data.productName} successfully`, {
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

  const offset = currentPage * productsPerPage;
  const currentProducts = products.slice(offset, offset + productsPerPage);

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
        listData={currentProducts}
        show={showEdit}
        formAdd={setAddForm}
        formDel={onDelete}
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

      {addForm && (
        <Forms
          submitFunc={onSubmit}
          closeForm={closeForm}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Products;
