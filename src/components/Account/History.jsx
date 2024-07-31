import React, { useState, useEffect } from "react";
import shipping from "../../assets/images/shipping_img.png";
import { orderAPI } from "../../modules/apiClient";
import { format, parseISO } from "date-fns";
import numeral from "numeral";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

export default function History({ id }) {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const ordersPerPage = 5;

  const getOrders = async () => {
    await orderAPI()
      .GET_HISTORY(id)
      .then((res) => {
        setOrders(res.data);
        setPageCount(Math.ceil(res.data.length / ordersPerPage));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
    window.scrollTo(0,0);
  };

  const offset = currentPage * ordersPerPage;
  const currentOrders = orders.slice(offset, offset + ordersPerPage);

  return (
    <div className="w-full lg:w-2/3 my-5">
      <h2 className="text-2xl font-bold text-left w-3/4 mx-auto mb-2">
        Orders
      </h2>
      {currentOrders.map((item, index) => (
        <Link key={index} to={`${item.orderId}`}>
          <div
            className="shadow-2xl w-3/4 mx-auto rounded-lg p-4 flex my-6 bg-white hover:bg-gray-100 cursor-pointer"
          >
            <div className="w-1/4">
              <img src={shipping} alt="" className="w-16 h-16 md:w-20 md:h-20" />
            </div>
            <div className="w-3/4 space-y-2">
              <p className="text-xs text-left text-gray-400">
                {format(parseISO(item.orderDate), "dd-MM-yyyy HH:mm:ss")}
              </p>
              <p className="text-left text-sm max-md:hidden">Order status: On delivery</p>
              <p className="text-right text-yellow-600 font-semibold max-md:text-sm">
                Total price: {numeral(item.totalPrice).format("0,0")} đ
              </p>
            </div>
          </div>
        </Link>
      ))}
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}   
        pageCount={pageCount}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"flex w-3/4 mx-auto justify-between items-center"}
        activeLinkClassName="w-10 h-10 bg-slate-700 text-white"
        nextLinkClassName="px-4 py-2 border border-slate-700 border-2 rounded-xl hover:bg-slate-700 hover:text-white"
        previousLinkClassName={"px-4 py-2 border border-slate-700 border-2 rounded-xl hover:bg-slate-700 hover:text-white"}
        pageLinkClassName="block w-10 h-10 flex items-center justify-center rounded-md hover:bg-slate-700 hover:text-white cursor-pointer"
        breakLinkClassName={"cursor-text"}
        renderOnZeroPageCount={null}      
      />
    </div>
  );
}
