import React,{createContext, useState, useEffect} from 'react'
import axios from "axios"
import { apiUrl } from '../constants';

const ShopContext = createContext(null);


const ShopContextProvider = (props) => {
  const [products,setProducts] = useState([]);
  const[categories, setCategories] = useState([]);
  const[subCategories, setSubCategories] = useState([]);

  const  getProducts = async (url = apiUrl+"api/Products/") => {
    axios.get(url).then(res => {setProducts(res.data)}).catch(err => console.log(err));
  }

  const getCategories = async (url = apiUrl+"api/Categories/") => {
    axios.get(url).then(res => {setCategories(res.data)}).catch(err => console.log(err))
  }

  const getSubCategories = (url = apiUrl+"api/SubCategories/") => {
    axios.get(url).then((res) => {setSubCategories(res.data)}).catch(err => console.log(err))
  }

  useEffect(() => {
    getProducts();
    getCategories();
    getSubCategories();
  },[])

  return (
    <ShopContext.Provider value ={{ products, categories, subCategories, getProducts }}>
        {props.children} 
    </ShopContext.Provider>
  )
}


export {ShopContext}
export default ShopContextProvider;
