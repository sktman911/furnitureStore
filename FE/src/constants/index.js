import {
  AiOutlineUser,
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaUserGroup, FaRegMoneyBill1 } from "react-icons/fa6";
import { FaReceipt } from "react-icons/fa";


export const apiUrl = "https://localhost:7183/";

export const navLinks = [
  { href: "/", label: "Home", subMenu: false },
  { href: "/shop", label: "Shop", subMenu: true },
  { href: "/about", label: "About", subMenu: false },
  { href: "/contact", label: "Contact", subMenu: false },
];


export const footerLinks = [
  { key: "#home", name: "Home" },
  { key: "#shop", name: "Shop" },
  { key: "#about", name: "About" },
  { key: "#contact", name: "Contact" },
];

export const footerHelps = [
  { key: "#payment", name: "Payment Options" },
  { key: "#returns", name: "Returns" },
  { key: "#privacy", name: "Privacy Policies" },
];

export const dbContent = [
  {
    title: "Customers",
    icon: <FaUserGroup />,
    iconColor: "blue-600",
    iconBg: "blue-300",
    amount: 356.87,
    per: "- 2.7%",
    perColor: "red-600",
  },
  {
    title: "Orders",
    icon: <FaReceipt />,
    iconColor: "yellow-300",
    iconBg: "yellow-100",
    amount: 436.2,
    per: "+ 32.6%",
    perColor: "green-600",
  },
  {
    title: "Income",
    icon: <FaRegMoneyBill1 />,
    iconColor: "green-600",
    iconBg: "green-300",
    amount: 472.8,
    per: "+ 19.5%",
    perColor: "green-600",
  },
];

export {
  AiOutlineUser,
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
};
