import React, { useState,useEffect,useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router";
import Products from "../components/Products";
import ReactPaginate from "react-paginate";
import {motion} from "framer-motion";

export default function Search() {
    const { products } = useContext(ShopContext);
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search);
  const query = searchParam.get("query").toLowerCase();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const productsPerPage = 10;

  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setPageCount(Math.ceil(products.length / productsPerPage));
  }, []);

  const productsBySearch = products.filter((item) => item.productName.toLowerCase().includes(query));

  const offset = currentPage * productsPerPage;
  const currentProducts = productsBySearch.slice(
    offset,
    offset + productsPerPage
  );

  return (
    <motion.section className="w-full max-container max-lg:h-max mt-24" initial={{opacity: 0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration: 0.2}}>
      <div className="relative">
        <h1 className="text-2xl md:text-2xl py-3">Result for "{query}"</h1>
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
            sale = {item.sale}
              salePrice={Intl.NumberFormat('vi-VI',{style:'currency',currency: 'VND',}).format(item.price - (item.price * item.sale /100))}
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
    </motion.section>
  );
}
