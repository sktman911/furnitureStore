import React, { useEffect, useState } from "react";
import { RxSlash } from "react-icons/rx";
import List from "../components/Orders/List";
import { orderAPI } from "../modules/api/api";
import ReactPaginate from "react-paginate";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const ordersPerPage = 10;

  useEffect(() => {
    renderOrders();
  }, []);

  const renderOrders = () => {
    orderAPI()
      .GET()
      .then((res) => {
        setOrders(res.data);
        setPageCount(Math.ceil(res.data.length / ordersPerPage));
      })
      .catch((err) => console.log(err));
  };

  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
    window.scrollTo(0, 0);
  };

  const offset = currentPage * ordersPerPage;
  const currentOrders = orders.slice(offset, offset + ordersPerPage);

  return (
    <div className="pt-12">
      <div className="w-1/4 flex items-center ml-12 text-lg mb-10">
        <span>Management</span>
        <RxSlash className="mx-1" />
        <span>Orders</span>
      </div>

      <List listData={currentOrders} />

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

export default Orders;
