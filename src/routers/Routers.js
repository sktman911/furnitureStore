import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router";
import PrivateRoute from "./PrivateRoute";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

import shop from "../assets/images/category/shop.png";
import living from "../assets/images/category/living.png";

import Product from "../pages/Product";

import Dashboard from "../admin/pages/Dashboard";
import Categories from "../admin/pages/Categories";
import SubCategories from "../admin/pages/SubCategories";
import Products from "../admin/pages/Products";
import ADProduct from "../admin/pages/Product";
import Colors from "../admin/pages/Colors";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const Router = () => {
  const {categories, subCategories} = useContext(ShopContext);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />}></Route>
      <Route path="home" element={<Home />}></Route>
      <Route
        path="shop"
        element={<Shop banner={shop} category="all" />}
      ></Route>
      {categories.map((category, index) => (
        <Route
          key={index}
          path={`shop/${category.categoryName}`}
          element={<Shop banner={living} category={category.categoryName} />}
        >
          <Route path={`:subCategoryName`} element={<Shop />}></Route>
        </Route>
      ))}

      <Route path="product" element={<Product />}>
        <Route path=":productId" element={<Product />}></Route>
      </Route>
      <Route path="cart" element={<Cart />}></Route>
      <Route path="checkout" element={<Checkout />}></Route>

      <Route path="admin" element={<Navigate to="/admin/home" />}></Route>

      <Route path="admin/home" element={<PrivateRoute><Dashboard /></PrivateRoute>}></Route>
      <Route path="admin/employees"></Route>
      <Route path="admin/customers"></Route>
      <Route path="admin/products" element={<PrivateRoute><Products /></PrivateRoute>}></Route>
      <Route path="admin/product" element={<PrivateRoute><ADProduct /></PrivateRoute>}>
        <Route path=":productId" element={<PrivateRoute><ADProduct /></PrivateRoute>}></Route>
      </Route>
      <Route path="admin/categories" element={<PrivateRoute><Categories /></PrivateRoute>}></Route>
      <Route path="admin/subcategories" element={<PrivateRoute><SubCategories /></PrivateRoute>}></Route>
      <Route path="admin/colors" element={<PrivateRoute><Colors /></PrivateRoute>}></Route>

      <Route path="login" element={<Login />}></Route>
      <Route path="signup" element={<Signup />}></Route>
    </Routes>
  );
};

export default Router;
