import React,{createContext, useState, useEffect} from 'react'
import axios from "axios"

const ShopContext = createContext(null);


const ShopContextProvider = (props) => {
  const [products,setProducts] = useState([])

  const  getProducts = async (url = "https://localhost:7183/api/Products/") => {
    axios.get(url).then(res => {setProducts(res.data); console.log(res.data)}).catch(err => console.log(err));
  }

  useEffect(() => {
    getProducts();
  },[])

    const context = {products}; 

  return (
    <ShopContext.Provider value ={context}>
        {props.children} 
    </ShopContext.Provider>
  )
}


export {ShopContext}
export default ShopContextProvider;
