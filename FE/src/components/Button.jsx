import React from "react";
import { Link } from "react-router-dom";

const Button = ({className, onClick, title, link, type }) => {
  return (
    <>
      <Link to={link}>
        <button type={type} className={className} onClick={onClick}>{title}</button>
      </Link>
    </>
  );
};

export default Button;
