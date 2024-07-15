import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const PrivateRoute = (props) => {
  const user = useSelector((state) => state.user);

  if (user == null) {
    return (
      <>
        <Navigate to="/login" replace={true} />
      </>
    );
  }

  if (!user.role) {
    return (
      <>
        <Navigate to="/home" replace={true} />
      </>
    );
  }

  return <>{props.children}</>;
};

export default PrivateRoute;
