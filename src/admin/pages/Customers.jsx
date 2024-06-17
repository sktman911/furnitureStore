import React, { useEffect, useState } from "react";
import { RxSlash } from "react-icons/rx";
import List from "../components/Customers/List";
import { customerAPI } from "../modules/api/api";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    renderCustomers();
  }, []);

  const renderCustomers = () => {
    customerAPI()
      .GET()
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="pt-12">
      <div className="w-1/4 flex items-center ml-12 text-lg mb-10">
        <span>Management</span>
        <RxSlash className="mx-1" />
        <span>Customers</span>
      </div>

      <List listData={customers} />
    </div>
  );
};

export default Customers;
