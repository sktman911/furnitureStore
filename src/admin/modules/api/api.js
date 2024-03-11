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


  export {productSizeColorAPI, sizeAPI, colorAPI, productAPI, imageAPI, categoryAPI}