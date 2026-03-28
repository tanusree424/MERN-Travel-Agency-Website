import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const ProtectedRoute = ({ children }) => {

  const { userData, loading } = useContext(UserContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;