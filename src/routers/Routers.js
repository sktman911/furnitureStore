import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router'

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout"
import Login from "../pages/Login";
import Signup from "../pages/Signup";

import shop from "../assets/images/category/shop.png";
import dining from "../assets/images/category/dining.png"
import living from "../assets/images/category/living.png"
import bedroom from "../assets/images/category/bedroom.png"

import Product from "../pages/Product";

import Dashboard from "../admin/pages/Dashboard";
import Categories from '../admin/pages/Categories';
import SubCategories from '../admin/pages/SubCategories';
import Products from '../admin/pages/Products';
import ADProduct from "../admin/pages/Product";
import axios from 'axios';

const Router = () => {
  const [categories,setCategories] = useState([]);
  const [subCategories,setSubCategories] = useState([]);

  const getCategories = (url = "https://localhost:7183/api/Categories/") => {
    axios.get(url).then(res => setCategories(res.data)).catch(err => console.log(err))
  }

  const getSubCategories = (url = "https://localhost:7183/api/SubCategories/") => {
    axios.get(url).then((res) => {setSubCategories(res.data); console.log(res.data)}).catch(err => console.log(err))
  }

  useEffect(() => {
    getCategories();
    getSubCategories();
  },[])

  return (
    <Routes>
            
      <Route path="/" element={<Navigate to="home"/>}></Route>
      <Route path="home" element={<Home/>}></Route>
      <Route path="shop" element={<Shop banner={shop} category="all"/>}></Route>
      {categories.map((category,index) => (
        <Route key={index} path={`shop/${category.categoryName}`} element={<Shop banner={living} category={category.categoryName}/>}>         
            <Route  path={`:subCategoryName`} element={<Shop />}></Route>
        </Route>
      ))}

      <Route path="product" element={<Product/>}>
        <Route path=":productId" element={<Product/>}></Route>
      </Route>
      <Route path="cart" element={<Cart />}></Route>
      <Route path='checkout' element={<Checkout />}></Route>


      <Route path="admin" element={<Navigate to="/admin/home"/>}></Route>
      <Route path="admin/home" element={<Dashboard />}></Route>
      <Route path='admin/employees' ></Route>
      <Route path='admin/customers' ></Route>
      <Route path='admin/products' element={<Products />}></Route>
      <Route path="admin/product" element={<ADProduct/>}>
        <Route path=":productId" element={<ADProduct/>}></Route>
      </Route>
      <Route path='admin/categories' element={<Categories />}></Route>
      <Route path='admin/subcategories' element={<SubCategories />}></Route>

      <Route path='login' element={<Login />}></Route>
      <Route path='signup' element={<Signup />}></Route>
    </Routes>
  )
}

export default Router
