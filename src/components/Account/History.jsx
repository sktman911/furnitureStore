import React, { useState, useEffect, useCallback, useMemo } from "react";
import shipping from "../../assets/images/shipping_img.png";
import { orderAPI } from "../../modules/apiClient";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

export default function History({ id }) {
  const location = useLocation();

  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [param, setParam] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const ordersPerPage = 5;

  const getOrders = useCallback(async () => {
    await orderAPI()
      .GET_HISTORY(id)
      .then((res) => {
        setOrders(res.data);
        setPageCount(Math.ceil(res.data.length / ordersPerPage));
        setLoading(false);
      })
      .catch((err) => console.log(err));
      setLoading(true);
  }, [id]);

  useEffect(() => {
    getOrders();
    if (location.state && location.state.fromPage) {
      setCurrentPage(location.state.fromPage);
    }

  }, [getOrders, location.state]);

  useEffect(() => {
    if (currentPage > 0) {
      param.set("page", currentPage + 1);
      setParam(param, { replace: true });
    } else {
      param.delete("page");
      setParam(param, { replace: true });
    }

  }, [currentPage, param, setParam]);

  const handlePageClick = useCallback((e) => {
    setCurrentPage(e.selected);
  }, []);

  const offset = currentPage * ordersPerPage;
  const currentOrders = useMemo(
    () => orders.slice(offset, offset + ordersPerPage),
    [orders, offset, ordersPerPage]
  );

  if (!loading) {
    return <div className="mx-auto mt-40">Loading...</div>;
  }

  return (
    <div className="w-full lg:w-2/3 my-5">
      <h2 className="text-2xl font-bold text-left w-3/4 mx-auto mb-2">
        Orders
      </h2>

      {currentOrders.map((item, index) => (
        <Link
          key={index}
          to={`${item.orderId}`}
          state={{ fromPage: currentPage }}
        >
          <div className="shadow-2xl w-3/4 mx-auto rounded-lg p-4 flex my-6 bg-white hover:bg-gray-100 cursor-pointer">
            <div className="w-1/4">
              <img
                src={shipping}
                alt=""
                className="w-16 h-16 md:w-20 md:h-20"
              />
            </div>
            <div className="w-3/4 space-y-2">
              <p className="text-xs text-left text-gray-400">
                {Intl.DateTimeFormat('us',{dateStyle: 'long',timeStyle: 'medium'}).format(new Date(item.orderDate))}
              </p>
              <p className="text-left text-sm max-md:hidden">
                Order status: On delivery
              </p>
              <p className="text-right text-yellow-600 font-semibold max-md:text-sm">
                Total price: {Intl.NumberFormat('vi-VI',{style: 'currency',currency: 'VND'}).format(item.totalPrice)}
              </p>
            </div>
          </div>
        </Link>
      ))}

      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        initialPage={currentPage}
        pageCount={pageCount}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"flex w-3/4 mx-auto justify-between items-center"}
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
}
