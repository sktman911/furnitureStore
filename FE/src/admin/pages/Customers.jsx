import React, { useEffect, useMemo, useState } from "react";
import { RxSlash } from "react-icons/rx";
import List from "../components/List";
import { customerAPI } from "../modules/api/api";
import ReactPaginate from "react-paginate";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const customersPerPage = 10;

  const customerTitle = useMemo(
    () => ["#", "ID", "Customer Name", "Phone number", "Email", "Actions"],
    []
  );

  useEffect(() => {
    renderCustomers();
  }, []);

  const renderCustomers = () => {
    customerAPI()
      .GET()
      .then((res) => {
        setCustomers(res.data);
        setPageCount(Math.ceil(res.data.length / customersPerPage));
        setLoading(true);
      })
      .catch((err) => console.log(err));
  };

  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
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

      {loading ? (
        <>
          <List
            listTitle={customerTitle}
            listItem={currentCustomers}
            render={(customer, index) => (
              <>
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{customer.cusId}</td>
                <td className="p-3">{customer.cusName}</td>
                <td className="p-3">{customer.cusPhone}</td>
                <td className="p-3">{customer.email}</td>
                <td className="text-xl p-3 justify-center">
                  <button>
                    <Link to={`/admin/customer/${customer.cusId}`}>
                      <IoIosInformationCircleOutline className="mx-1" />
                    </Link>
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
    </div>
  );
};

export default Customers;
