import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import { Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AdminProtectedRoute = ({ children }) => {
  const { userData, loading } = useContext(UserContext);

  // wait until user check complete
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h2>Loading...</h2>
      </div>
    );
  }

  // not logged in
  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  // not admin
  if (userData.role !== "Admin") {
    toast.error("You are not Authorized to open this Page");
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminProtectedRoute;