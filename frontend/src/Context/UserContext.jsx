import React, { createContext, useState, useEffect } from "react";
import api from "../Api/Api";
import toast from "react-hot-toast";

// Context create
export const UserContext = createContext(); // Context

// Provider Component
const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await api.get("/user/current-user", { withCredentials: true });
      console.log(response.data);
      setUserData(response.data.user || response.data); // user object
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
      setUserData(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const value = { userData, setUserData };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider; // Provider component export