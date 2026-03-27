import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { userData } = useContext(UserContext);

  if (!userData) {
    // User logged-in না হলে login page এ redirect
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;