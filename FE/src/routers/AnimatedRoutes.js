import React, { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router";

import shop from "../assets/images/category/shop.png";
import living from "../assets/images/category/living.png";
import { ShopContext } from "../context/ShopContext";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Product from "../pages/Product";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PaymentReturn from "../pages/PaymentReturn";
import Account from "../pages/Account";
import OrderDetail from "../pages/OrderDetail";
import Search from "../pages/Search";
import Favourite from "../pages/Favourite";

import Dashboard from "../admin/pages/Dashboard";
import Categories from "../admin/pages/Categories";
import SubCategories from "../admin/pages/SubCategories";
import Products from "../admin/pages/Products";
import ADProduct from "../admin/pages/Product";
import Colors from "../admin/pages/Colors";
import Orders from "../admin/pages/Orders";
import Customers from "../admin/pages/Customers";
import ADOrderDetail from "../admin/pages/OrderDetail";
import CustomerDetail from "../admin/pages/CustomerDetail";

import PrivateRoute from "./PrivateRoute";

import { AnimatePresence } from "framer-motion";
import Contact from "../pages/Contact";

export default function AnimatedRoutes() {
  const { categories, subCategories } = useContext(ShopContext);
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home/>}></Route>
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
        <Route path="search" element={<Search />}></Route>

        <Route path="product" element={<Product />}>
          <Route path=":productId" element={<Product />}></Route>
        </Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="checkout" element={<Checkout />}></Route>
        <Route path="paymentReturn" element={<PaymentReturn />}></Route>
        <Route path="favourite" element={<Favourite />}></Route>
        <Route path="contact" element={<Contact/>}></Route>

        <Route
          path="profile"
          element={<Account component={"profile"} />}
        ></Route>
        <Route
          path="history"
          element={<Account component={"history"} />}
        ></Route>
        <Route path="history/:orderId" element={<OrderDetail />}></Route>

        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>

        {/* Admin route */}
        <Route path="admin" element={<Navigate to="/admin/home" />}></Route>
        <Route
          path="admin/home"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        ></Route>
        <Route path="admin/employees"></Route>
        <Route
          path="admin/customers"
          element={
            <PrivateRoute>
              <Customers />
            </PrivateRoute>
          }
        ></Route>
        <Route path="admin/customer">
          <Route
            path=":customerId"
            element={
              <PrivateRoute>
                <CustomerDetail />
              </PrivateRoute>
            }
          ></Route>
        </Route>
        <Route
          path="admin/products"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        ></Route>
        <Route path="admin/product">
          <Route
            path=":productId"
            element={
              <PrivateRoute>
                <ADProduct />
              </PrivateRoute>
            }
          ></Route>
        </Route>
        <Route
          path="admin/categories"
          element={
            <PrivateRoute>
              <Categories />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="admin/subcategories"
          element={
            <PrivateRoute>
              <SubCategories />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="admin/colors"
          element={
            <PrivateRoute>
              <Colors />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="admin/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        ></Route>
        <Route path="admin/order">
          <Route
            path=":orderId"
            element={
              <PrivateRoute>
                <ADOrderDetail />
              </PrivateRoute>
            }
          ></Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
