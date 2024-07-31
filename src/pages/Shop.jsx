import React, { useContext, useEffect, useState, useMemo } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { ShopContext } from "../context/ShopContext";
import Products from "../components/Products";
import Info from "../components/Info";
import { useParams } from "react-router";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";

const Shop = (props) => {
  const { products } = useContext(ShopContext);
  const { subCategoryName } = useParams();
  const [sort, setSort] = useSearchParams();
  const [sortBy, setSortBy] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(10);

  // select products by category, subcategory 
  let productsByCate = [];
  if (subCategoryName) {
    productsByCate = products.filter(
      (item) =>
        subCategoryName.toLowerCase() === item.subCategoryName.toLowerCase() &&
        props.category.toLowerCase() === item.categoryName.toLowerCase()
    );
  } else if (!subCategoryName && props.category !== "all") {
    productsByCate = products.filter(
      (item) => props.category.toLowerCase() === item.categoryName.toLowerCase()
    );
  } else if(props.category === "all"){
    productsByCate = products;
  }

  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
    window.scrollTo(0, 0);
  };

  const sortItems = useMemo(
    () => [
      { label: "Name", value: "name" },
      { label: "Low Price", value: "priceAsc" },
      { label: "High Price", value: "priceDesc" },
    ],
    []
  );

  useEffect(() => {
    setPageCount(Math.ceil(products.length / productsPerPage));
  }, [products.length, productsPerPage]);

  const handleProductsPerPage = (e) => {
    let newValue = parseInt(e.target.value);
    if (!newValue || newValue === null || newValue === 0) {
      newValue = 1;
    }
    setProductsPerPage(newValue);
  };

  const hanldeChangeSort = (e) => {
    if (e.target.value === "" && sort.get("sort")) {
      sort.delete("sort");
      setSort(sort, { replace: true });
      return;
    }
    setSortBy(e.target.value);
    sort.set("sort", e.target.value);
    setSort(sort, { replace: true });
  };

  const applySort = () => {
    return productsByCate.sort((a, b) => {
      const { productName: nameA, price: priceA } = a;
      const { productName: nameB, price: priceB } = b;

      switch (sortBy) {
        case "name":
          return nameA.localeCompare(nameB);
        case "priceAsc":
          return priceA - priceB;
        case "priceDesc":
          return priceB - priceA;
        default:
          return null;
      }
    });
  };

  const offset = currentPage * productsPerPage;

  const filterProducts = applySort();
  const currentProducts = filterProducts.slice(
    offset,
    offset + productsPerPage
  );

  return (
    <section className="w-full max-container max-lg:h-max mt-24">
      <div className="relative">
        <img className="w-full h-full" src={props.banner} alt="" />
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 font-bold">
          <h1 className="text-2xl md:text-4xl my-3 text-white">Shop</h1>
          <span className="uppercase text-white text-sm md:text-lg">
            Home
            <span className="mx-2">&gt;</span>
            <span className="font-normal">Shop</span>
            <span className="mx-2">&gt;</span>
            <span className=" font-normal">{props.category}</span>
            {subCategoryName ? (
              <>
                <span className="mx-2">&gt;</span>
                <span className=" font-normal">{subCategoryName}</span>
              </>
            ) : null}
          </span>
        </div>
      </div>

      <div className="w-full bg-yellow-50 max-lg:h-max grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 items-center py-5">
        <div className="grid grid-cols-2 gap-5 text-center">
          <div className="flex items-center justify-center gap-3">
            <HiOutlineAdjustmentsHorizontal className="text-lg" />
            <span>Filter</span>
          </div>
          <div className="flex gap-6 items-center justify-center lg:justify-normal">
            <span className=" text-2xl">|</span>
            <span>
              Showing {offset + 1} - {offset + productsPerPage} of{" "}
              {filterProducts.length} results
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 items-center">
          <div className="flex gap-5 justify-center lg:justify-end items-center">
            <span>Show</span>
            <input
              type="text"
              value={productsPerPage}
              onChange={(e) => handleProductsPerPage(e)}
              className=" outline-none w-1/6 text-center text-gray-400 py-2"
            />
          </div>
          <div className="flex gap-5 justify-center items-center">
            <span>Sort by</span>
            <select
              onChange={hanldeChangeSort}
              className=" outline-none w-1/3 text-center text-gray-400 py-2"
            >
              <option value="" placeholder="Default">
                Default
              </option>
              {sortItems.map((item, index) => (
                <option key={item.label} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-11/12 justify-around mx-auto my-5">
        {currentProducts.map((item, index) => (
          <Products
            key={index}
            id={item.productId}
            img={item.images[0].imageLink}
            name={item.productName}
            des={item.description}
            price={item.price}
          />
        ))}
      </div>

      {currentProducts.length > 0 ? (
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          marginPagesDisplayed={3}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={
            "flex w-1/3 gap-4 mx-auto justify-center items-center my-6"
          }
          activeLinkClassName="w-8 h-8 md:w-10 md:h-10 bg-slate-700 text-white"
          nextLinkClassName="px-3 py-1 md:px-4 md:py-2 border border-slate-700 border-2 rounded-full hover:bg-slate-700 hover:text-white"
          previousLinkClassName={
            "px-3 py-1 md:px-4 md:py-2 border border-slate-700 border-2 rounded-full hover:bg-slate-700 hover:text-white"
          }
          pageLinkClassName="block w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-slate-700 hover:text-white cursor-pointer"
          breakLinkClassName={"cursor-text"}
          renderOnZeroPageCount={null}
        />
      ) : null}

      <Info />
    </section>
  );
};

export default Shop;
