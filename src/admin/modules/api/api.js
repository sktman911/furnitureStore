import axios from "axios";


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
    };
  };
// End Size API


// Color API
  const colorAPI = (url = "https://localhost:7183/api/Colors/") => {
    return {
      GET: () => axios.get(url),
      POST: (newData) => axios.post(url, newData),
      PUT: (id, updateData) => axios.put(url + id, updateData),
      DELETE: (id) => axios.delete(url + id),
    };
  };
// End Color API

// Product API
const productAPI = (url = "https://localhost:7183/api/Products/") => {
    return {
      GET_ID: (id) => axios.get(url + id),
      PUT: (id, data) => axios.put(url + id, data),
      GET: () => axios.get(url + "getAll"),
      POST: (newData) => axios.post(url, newData),
      DELETE: (id) => axios.delete(url + id),
    };
  };
// End Product API


// Image API
  const imageAPI = (url = "https://localhost:7183/api/Images/") => {
    return {
      GET: (id) => axios.get(url + id),
      POST: (data) => axios.post(url, data),
      PUT: (id, data) => axios.put(url + id, data)
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

// SubCategories API
const subCategoriesAPI = (url = "https://localhost:7183/api/SubCategories/") => {
  return {
    GET: () => axios.get(url),
    POST: (newData) => axios.post(url, newData),
    PUT: (id, updateData) => axios.put(url + id, updateData),
    DELETE: (id) => axios.delete(url + id),
  };
};
// End SubCategories API

// Orders API
const orderAPI = (url = "https://localhost:7183/api/Orders/") => {
  return {
    GET: () => axios.get(url),
    GET_ID: (id) => axios.get(url + id),
    POST: (newData) => axios.post(url, newData),
    PUT: (id) => axios.put(url +id)
  };
};
//End Orders API

// OrderDetail API
const orderDetailAPI = (url = "https://localhost:7183/api/OrderDetail/") => {
  return {
    GET: (id) => axios.get(url + id),
  };
};
//End OrderDetail API

// Customers API
const customerAPI = (url = "https://localhost:7183/api/Customers/") => {
  return {
    GET: () => axios.get(url),
    POST: (newData) => axios.post(url, newData),
    GET_ID: (id) => axios.get(url + id)
  };
};
//End Customers API


  export {productSizeColorAPI, sizeAPI, colorAPI, productAPI, imageAPI, categoryAPI, orderAPI, customerAPI, orderDetailAPI, subCategoriesAPI}