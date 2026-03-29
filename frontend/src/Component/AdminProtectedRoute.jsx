import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import { Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AdminProtectedRoute = ({ children }) => {

  const { userData } = useContext(UserContext);

  // not logged in
  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  // not admin
  if (userData.role !== "Admin") {
    toast.error("You are not Authorized to open this Page");
    return <Navigate to="/" replace />;
  }

  // admin
  return children;
}

export default AdminProtectedRoute;