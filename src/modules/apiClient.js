import axios from "axios";


// Authentication API
const authAPI = (url = "https://localhost:7183/api/Authentication/") => {
  return {
    LOGIN: (data) => axios.post(url,data), 
    SIGNUP: (data) => axios.post(url + "signup",data)
  };
};

// Product Size Color API 
const productSizeColorAPI = (
    url = "https://localhost:7183/api/ProductSizeColors/"
  ) => {
    return {
      GET: (id) => axios.get(url + id),
      POST: (data) => axios.post(url, data),
      PUT: (id, data) => axios.put(url + id, data),
    };
  };
// End Product Size Color API 

// Size API
  const sizeAPI = (url = "https://localhost:7183/api/Sizes/") => {
    return {
      GET: () => axios.get(url),
      GET_ID: (id)=> axios.get(url + id),
    };
  };
// End Size API


// Color API
  const colorAPI = (url = "https://localhost:7183/api/Colors/") => {
    return {
      GET: () => axios.get(url),
      GET_ID: (id) => axios.get(url + id)
    };
  };
// End Color API

// Product API
const productAPI = (url = "https://localhost:7183/api/Products/") => {
    return {
      GET: (id) => axios.get(url + id),
      PUT: (id, data) => axios.put(url + id, data),
    };
  };
// End Product API


// Image API
  const imageAPI = (url = "https://localhost:7183/api/Images/") => {
    return {
      GET: (id) => axios.get(url + id),
      POST: (data) => axios.post(url, data),
    };
  };
// End Image API

// Categories API
const categoryAPI = (url = "https://localhost:7183/api/Categories/") => {
  return {
    GET: () => axios.get(url),
    POST: (newData) => axios.post(url, newData),
    PUT: (id, updateData) => axios.put(url + id, updateData),
    DELETE: (id) => axios.delete(url + id),
  };
};
//End Categories API

// Customers API

const customerAPI = (url = "https://localhost:7183/api/Customers/") => {
  return {
    GET_ID: (id) => axios.get(url + id),
    PUT: (id, data) => axios.put(url+id, data)
  };
};

// End Customers API

// Orders API

const orderAPI = (url = "https://localhost:7183/api/Orders/") => {
  return {
    POST: (newData) => axios.post(url, newData),
    GET_ID: (id) => axios.get(url + id),
    GET_HISTORY: (id) => axios.get(url + "customer/getOrders/" + id)
  };
};

// End Orders API

// OrderDetail API
const orderDetailAPI = (url = "https://localhost:7183/api/OrderDetail/") => {
  return {
    GET: (id) => axios.get(url + id),
  };
};
//End OrderDetail API


  export {productSizeColorAPI, sizeAPI, colorAPI, productAPI, imageAPI, categoryAPI, authAPI, customerAPI, orderAPI,orderDetailAPI}