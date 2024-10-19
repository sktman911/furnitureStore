import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import defaultImg from "../assets/images/default_img.png"

import { RxSlash } from "react-icons/rx";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import List from "../components/List";
import Forms from "../components/Products/Forms";
import ExcelForm from "../components/Products/ExcelForm";
import { productAPI } from "../modules/api/api";
import ReactPaginate from "react-paginate";
import { errorMessage } from "../../constants/message";

const Products = () => {
  const {
    reset,
    register,
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
  const [excelForm, setExcelForm] = useState(false);
  const [edit, setEdit] = useState();
  const [loading, setLoading] = useState();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const productsPerPage = 10;

  const productTitle = useMemo(
    () => [
      "#",
      "Image",
      "Product Name",
      "Price",
      "SubCategory Name",
      "Actions",
    ],
    []
  );

  useEffect(() => {
    renderProducts();
  }, []);

  const exportToExcel = useCallback(async () => {
    await productAPI()
      .EXPORT()
      .then((res) => {
        const url = URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Products.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((err) => console.log(err));
  }, []);

  const renderProducts = () => {
    productAPI()
      .GET()
      .then((res) => {
        setProducts(res.data);
        setPageCount(Math.ceil(res.data.length / productsPerPage));
        setLoading(true);
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
              if (res.status.valueOf(201)) {
                renderProducts();
                swal(`Delete ${data.productName} successfully`, {
                  icon: "success",
                });
              } else {
                errorMessage("Delete fail.");
              }
            });
        }
      })
      .catch((err) => console.log(err));
  };

  const closeForm = () => {
    setAddForm(false);
    setExcelForm(false);
    reset();
    setEdit(null);
  };

  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
  };

  const offset = currentPage * productsPerPage;
  const currentProducts = products.slice(offset, offset + productsPerPage);

  return (
    <div className="pt-12 ">
      <div className="w-1/4 flex items-center ml-12 text-lg">
        <span>Management</span>
        <RxSlash className="mx-1" />
        <span>Products</span>
      </div>

      <div className="flex justify-between my-8 w-11/12 mx-auto">
        <button
          onClick={() => setAddForm(true)}
          className="px-3 py-2 bg-slate-800 text-white rounded-xl"
        >
          Product +
        </button>

        <div className="flex gap-4">
          <button
            onClick={() => setExcelForm(true)}
            type="button"
            className=" bg-slate-800 text-white rounded-xl px-3 py-2"
          >
            Import Excel
          </button>

          <button
            onClick={exportToExcel}
            className=" bg-slate-800 text-white rounded-xl px-3 py-2"
          >
            Export Excel
          </button>
        </div>
      </div>

      {loading ? (
        <>
          <List
            listTitle={productTitle}
            listItem={currentProducts}
            render={(product, index) => (
              <>
                <td className="p-3">{index + 1}</td>
                <td className="p-3 flex justify-center">
                  {product.images.length > 0
                    ? (
                      <img
                        src={product.images[0].imageLink}
                        className="w-20 h-20"
                        alt="Alt"
                      />
                    ) : <img
                    src={defaultImg}
                    className="w-20 h-20"
                    alt="Alt"
                  />}
                </td>
                <td className="p-3">{product.productName}</td>
                <td className="p-3">{Intl.NumberFormat('vi-VI', {style:'currency',currency:'VND'}).format(product.price)}</td>
                <td className="p-3">{product.subCategoryName}</td>
                <td className="text-xl p-3 justify-center">
                  <button>
                    <Link to={`/admin/product/${product.productId}`}>
                      <FaRegEdit className="mx-1" />
                    </Link>
                  </button>
                  <button>
                    <FaRegTrashAlt
                      className="mx-1"
                      onClick={(e) => onDelete(product, e)}
                    />
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

      {/* Add product form  */}
      {addForm && (
        <Forms
          submitFunc={onSubmit}
          closeForm={closeForm}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          addForm={addForm}
        />
      )}

      {/* Import excel form  */}
      {excelForm && (
        <ExcelForm closeForm={closeForm} renderProducts={renderProducts} />
      )}
    </div>
  );
};

export default Products;
