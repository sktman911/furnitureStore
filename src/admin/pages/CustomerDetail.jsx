import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { customerAPI } from "../modules/api/api";
import { format, parseISO } from "date-fns";

export default function CustomerDetail() {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null);

  const getCustomer =  async () => {
    await customerAPI()
      .GET_ID(customerId)
      .then((res) => setCustomer(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCustomer();
  }, []);
  console.log("a")

  return customer !== null && customer.doB ?  (
    <div className="pt-12">
      <div className="my-6 text-left w-4/5 mx-auto ">
        <Link
          to={"/admin/customers"}
          className="w-24 bg-slate-800 text-white py-2 px-4 rounded-md flex items-center justify-around"
        >
          <IoArrowBackOutline /> <span>Back</span>
        </Link>
      </div>
      <div className="w-4/5 py-5 shadow-2xl rounded-md mx-auto bg-yellow-50">
        <h2 className=" text-2xl font-bold mb-4">Customer Info</h2>
        <div className="flex justify-between w-10/12 mx-auto text-start">
          <div className="w-4/6">
            <span>Customer ID: </span>
            <span>{customer.cusId}</span>
          </div>
          <div className="w-2/6">
            <span>Phone number: </span>
            <span>{customer.cusPhone}</span>
          </div>
        </div>
        <div className="flex justify-between pt-6 w-10/12 mx-auto text-start">
        <div className="w-4/6">
            <span>Email: </span>
            <span>{customer.email}</span>
          </div>
          <div className="w-2/6">
            <span>Customer Name: </span>
            <span>{customer.cusName}</span>
          </div>
        </div>
        <div className="flex justify-between pt-6 w-10/12 mx-auto text-start">
          <div className="w-4/6">
            <span>Username: </span>
            <span>{customer.username}</span>
          </div>
          <div className="w-2/6">
            <span>Birthday: </span>
            <span>{format(parseISO(customer.doB), "dd-MM-yyyy")}</span>
          </div>
        </div>
        <div className="py-6 w-10/12 mx-auto text-start">
          <div className="w-4/6">
            <span>Customer address: </span>
            <span>{customer.cusAddress}</span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="mx-auto w-1/2">Loading</div>
  );
}
