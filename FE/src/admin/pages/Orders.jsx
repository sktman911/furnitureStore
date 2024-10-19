import React, { useEffect, useMemo, useState } from "react";
import { RxSlash } from "react-icons/rx";
import List from "../components/List";
import { orderAPI } from "../modules/api/api";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { IoIosInformationCircleOutline } from "react-icons/io";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const ordersPerPage = 10;

  const orderTitle = useMemo(
    () => ["#", "ID", "Total Price", "Total Quantity", "Order Date", "Actions"],
    []
  );

  const offset = currentPage * ordersPerPage;
  const currentOrders = orders.slice(offset, offset + ordersPerPage);

  useEffect(() => {
    renderOrders();
  }, []);

  const renderOrders = () => {
    orderAPI()
      .GET()
      .then((res) => {
        setOrders(res.data);
        setPageCount(Math.ceil(res.data.length / ordersPerPage));
        setLoading(true);
      })
      .catch((err) => console.log(err));
  };

  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
    window.scrollTo(0, 0);
  };

  return (
    <div className="pt-12">
      <div className="w-1/4 flex items-center ml-12 text-lg mb-10">
        <span>Management</span>
        <RxSlash className="mx-1" />
        <span>Orders</span>
      </div>

      {loading ? (
        <>
          <List
            listTitle={orderTitle}
            listItem={currentOrders}
            render={(order, index) => (
              <>
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{order.orderId}</td>
                <td className="p-3">
                  {Intl.NumberFormat('vi-VI', {style:'currency',currency:'VND'}).format(order.totalPrice)}
                </td>
                <td className="p-3">{order.totalQuantity}</td>
                <td className="p-3">
                  {Intl.DateTimeFormat('us', {dateStyle: 'long', timeStyle: 'medium'}).format(new Date(order.orderDate))}
                </td>
                <td className="text-xl p-3 justify-center">
                  <button>
                    <Link to={`/admin/order/${order.orderId}`}>
                      <IoIosInformationCircleOutline className="mx-1 w-6 h-6 rounded-full hover:bg-slate-700 hover:text-white" />
                    </Link>
                  </button>
                </td>
              </>
            )}
          />

            {/* Pagination  */}
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
    </div>
  );
};

export default Orders;
