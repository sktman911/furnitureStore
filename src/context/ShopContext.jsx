import React,{createContext, useState, useEffect} from 'react'
import axios from "axios"

const ShopContext = createContext(null);


const ShopContextProvider = (props) => {
  const [products,setProducts] = useState([]);
  const[categories, setCategories] = useState([]);
  const[subCategories, setSubCategories] = useState([]);

  const  getProducts = async (url = "https://localhost:7183/api/Products/") => {
    axios.get(url).then(res => {setProducts(res.data)}).catch(err => console.log(err));
  }

  const getCategories = (url = "https://localhost:7183/api/Categories/") => {
    axios.get(url).then(res => {setCategories(res.data)}).catch(err => console.log(err))
  }

  const getSubCategories = (url = "https://localhost:7183/api/SubCategories/") => {
    axios.get(url).then((res) => {setSubCategories(res.data)}).catch(err => console.log(err))
  }

  useEffect(() => {
    getProducts();
    getCategories();
    getSubCategories();
  },[])

  return (
    <ShopContext.Provider value ={{ products, categories, subCategories }}>
        {props.children} 
    </ShopContext.Provider>
  )
}


export {ShopContext}
export default ShopContextProvider;
