import axios from "axios";
import { apiUrl } from "../../../constants";

// Product Size Color API 
const productSizeColorAPI = (
    url = apiUrl+"api/ProductSizeColors/"
  ) => {
    return {
      GET: (id) => axios.get(url + id),
      POST: (data) => axios.post(url, data),
      PUT: (id, data) => axios.put(url + id, data),
    };
  };
// End Product Size Color API 

// Size API
  const sizeAPI = (url = apiUrl+"api/Sizes/") => {
    return {
      GET: () => axios.get(url),
    };
  };
// End Size API


// Color API
  const colorAPI = (url = apiUrl+ "api/Colors/") => {
    return {
      GET: () => axios.get(url),
      POST: (newData) => axios.post(url, newData),
      PUT: (id, updateData) => axios.put(url + id, updateData),
      DELETE: (id) => axios.delete(url + id),
    };
  };
// End Color API

// Product API
const productAPI = (url = apiUrl+"api/Products/") => {
    return {
      GET_ID: (id) => axios.get(url + id),
      PUT: (id, data) => axios.put(url + id, data),
      GET: () => axios.get(url + "getAll"),
      POST: (newData) => axios.post(url, newData),
      DELETE: (id) => axios.delete(url + id),
      EXPORT: () => axios.get(url + "exportExcel",{responseType: 'blob'}),
      IMPORT: (file) => axios.post(url + "importExcel", file),
    };
  };
// End Product API


// Image API
  const imageAPI = (url = apiUrl+"api/Images/") => {
    return {
      GET: (id) => axios.get(url + id),
      POST: (data) => axios.post(url, data),
      PUT: (id, data) => axios.put(url + id, data)
    };
  };
// End Image API

// Categories API
const categoryAPI = (url = apiUrl+"api/Categories/") => {
  return {
    GET: () => axios.get(url),
    POST: (newData) => axios.post(url, newData),
    PUT: (id, updateData) => axios.put(url + id, updateData),
    DELETE: (id) => axios.delete(url + id),
  };
};
//End Categories API

// SubCategories API
const subCategoriesAPI = (url = apiUrl+"api/SubCategories/") => {
  return {
    GET: () => axios.get(url),
    POST: (newData) => axios.post(url, newData),
    PUT: (id, updateData) => axios.put(url + id, updateData),
    DELETE: (id) => axios.delete(url + id),
  };
};
// End SubCategories API

// Orders API
const orderAPI = (url = apiUrl+"api/Orders/") => {
  return {
    GET: () => axios.get(url),
    GET_ID: (id) => axios.get(url + id),
    POST: (newData) => axios.post(url, newData),
    PUT: (id, data) => axios.put(url +id, data)
  };
};
//End Orders API

// OrderDetail API
const orderDetailAPI = (url = apiUrl+"api/OrderDetail/") => {
  return {
    GET: (id) => axios.get(url + id),
  };
};
//End OrderDetail API

// Customers API
const customerAPI = (url = apiUrl+"api/Customers/") => {
  return {
    GET: () => axios.get(url),
    POST: (newData) => axios.post(url, newData),
    GET_ID: (id) => axios.get(url + id),
  };
};
//End Customers API


  export {productSizeColorAPI, sizeAPI, colorAPI, productAPI, imageAPI, categoryAPI, orderAPI, customerAPI, orderDetailAPI, subCategoriesAPI}