import React, { useEffect, useState } from "react";
import { RxSlash } from "react-icons/rx"; 
import List from "../components/Orders/List";
import {orderAPI} from "../modules/api/api"


const Orders = () => {
    const [orders,setOrders] = useState([]);
    useEffect(() =>{
        renderOrders();
    },[])

    const renderOrders = () => {
        orderAPI()
          .GET()
          .then((res) => {
            
            setOrders(res.data)
          })
          .catch((err) => console.log(err));
      };

  return (
    <div className="pt-12">
    <div className="w-1/4 flex items-center ml-12 text-lg mb-10">
      <span>Management</span>
      <RxSlash className="mx-1" />
      <span>Orders</span>
    </div>


    <List
      listData={orders}
    />

  </div>
  );
};

export default Orders;
