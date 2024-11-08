import React,{createContext, useState, useEffect} from 'react'
import axios from "axios"
import { apiUrl } from '../constants';
import { colorAPI, sizeAPI } from '../modules/apiClient';

const ShopContext = createContext(null);


const ShopContextProvider = (props) => {
  const [products,setProducts] = useState([]);
  const[categories, setCategories] = useState([]);
  const[subCategories, setSubCategories] = useState([]);
  const[sizes, setSize] = useState([]);
  const[colors, setColor] = useState([]);

  const  getProducts = async (url = apiUrl+"api/Products/") => {
    axios.get(url).then(res => {setProducts(res.data);console.log(res.data)}).catch(err => console.log(err));
  }

  const getCategories = async (url = apiUrl+"api/Categories/") => {
    axios.get(url).then(res => {setCategories(res.data)}).catch(err => console.log(err))
  }

  const getSubCategories = (url = apiUrl+"api/SubCategories/") => {
    axios.get(url).then((res) => {setSubCategories(res.data)}).catch(err => console.log(err))
  }

  const getSizes = () =>{
    sizeAPI()
      .GET()
      .then((res) => setSize(res.data))
      .catch((err) => console.log(err));
  }

  const getColors = () => {
    colorAPI().GET().then(res => setColor(res.data)).catch(err => console.log(err));
  }

  useEffect(() => {
    getProducts();
    getCategories();
    getSubCategories();
    getSizes();
    getColors();
  },[])

  return (
    <ShopContext.Provider value ={{ products, categories, subCategories, sizes, colors, getProducts }}>
        {props.children} 
    </ShopContext.Provider>
  )
}


export {ShopContext}
export default ShopContextProvider;
