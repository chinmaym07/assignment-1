import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isLogin } from "./isLogin";

const PrivateRoute = ({ children, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to / (login) page
    isLogin() ? children : <Navigate to="/" />
  );
};

export default PrivateRoute;
