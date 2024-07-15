import React, { useEffect, useState } from "react";
import { RxSlash } from "react-icons/rx";
import List from "../components/Customers/List";
import { customerAPI } from "../modules/api/api";
import ReactPaginate from "react-paginate";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const customersPerPage = 10;

  useEffect(() => {
    renderCustomers();
  }, []);

  const renderCustomers = () => {
    customerAPI()
      .GET()
      .then((res) => {
        setCustomers(res.data);
        setPageCount(Math.ceil(res.data.length / customersPerPage));
      })
      .catch((err) => console.log(err));
  };

  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
    window.scrollTo(0, 0);
  };

  const offset = currentPage * customersPerPage;
  const currentCustomers = customers.slice(offset, offset + customersPerPage);

  return (
    <div className="pt-12">
      <div className="w-1/4 flex items-center ml-12 text-lg mb-10">
        <span>Management</span>
        <RxSlash className="mx-1" />
        <span>Customers</span>
      </div>

      <List listData={currentCustomers} />

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
      
    </div>
  );
};

export default Customers;
