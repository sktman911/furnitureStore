import axios from "axios";
import { apiUrl } from "../constants";

const baseURL = apiUrl;

// Authentication API
const authAPI = (url = `${baseURL}api/Authentication/`) => {
  return {
    LOGIN: (data) => axios.post(url,data), 
    SIGNUP: (data) => axios.post(url + "signup",data)
  };
};

// Product Size Color API 
const productSizeColorAPI = (
    url = `${baseURL}api/ProductSizeColors/`
  ) => {
    return {
      GET: (id) => axios.get(url + id),
      POST: (data) => axios.post(url, data),
      PUT: (id, data) => axios.put(url + id, data),
    };
  };
// End Product Size Color API 

// Size API
  const sizeAPI = (url = `${baseURL}api/Sizes/`) => {
    return {
      GET: () => axios.get(url),
      GET_ID: (id)=> axios.get(url + id),
    };
  };
// End Size API


// Color API
  const colorAPI = (url = `${baseURL}api/Colors/`) => {
    return {
      GET: () => axios.get(url),
      GET_ID: (id) => axios.get(url + id)
    };
  };
// End Color API

// Product API
const productAPI = (url = `${baseURL}api/Products/`) => {
    return {
      GET:() => axios.get(url),
      GET_ID: (id) => axios.get(url + id),
      GET_FAVOURITE: (customerId) => axios.get(url + "getFavourite/" + customerId), 
      PUT: (id, data) => axios.put(url + id, data),
    };
  };
// End Product API


// Image API
  const imageAPI = (url = `${baseURL}api/Images/`) => {
    return {
      GET: (id) => axios.get(url + id),
      POST: (data) => axios.post(url, data),
    };
  };
// End Image API

// Categories API
const categoryAPI = (url = `${baseURL}api/Categories/`) => {
  return {
    GET: () => axios.get(url),
    POST: (newData) => axios.post(url, newData),
    PUT: (id, updateData) => axios.put(url + id, updateData),
    DELETE: (id) => axios.delete(url + id),
  };
};
//End Categories API

// Customers API

const customerAPI = (url = `${baseURL}api/Customers/`) => {
  return {
    GET_ID: (id) => axios.get(url + id),
    PUT: (id, data) => axios.put(url+id, data),
  };
};

// End Customers API

// Orders API

const orderAPI = (url = `${baseURL}api/Orders/`) => {
  return {
    POST: (newData) => axios.post(url, newData),
    GET_ID: (id) => axios.get(url + id),
    GET_HISTORY: (id) => axios.get(url + "customer/getOrders/" + id)
  };
};

// End Orders API

// OrderDetail API
const orderDetailAPI = (url = `${baseURL}api/OrderDetail/`) => {
  return {
    GET: (id) => axios.get(url + id),
  };
};
//End OrderDetail API

// Favourites API

const favouriteAPI = (url = `${baseURL}api/Favourites/`) => {
  return {
    GET: (cusId,productId) => axios.get(`${url}${cusId}&&${productId}`),
    PUT: (id, data) => axios.put(url+id, data),
    POST: (data) => axios.post(url, data)
  };
};

// End Favourites API

// Reviews API

const reviewAPI = (url = `${baseURL}api/Review/`) => {
  return {
    POST: (data) => axios.post(url, data),
    GET: (productId) => axios.get(url + productId)
  };
};

// End Reviews API


  export {productSizeColorAPI, sizeAPI, colorAPI, productAPI, imageAPI, categoryAPI, authAPI, customerAPI, orderAPI,orderDetailAPI, favouriteAPI, reviewAPI}