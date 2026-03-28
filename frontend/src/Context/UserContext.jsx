import React, { createContext, useState, useEffect } from "react";
import api from "../Api/Api";
import toast from "react-hot-toast";

export const UserContext = createContext();

const UserProvider = ({ children }) => {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {

      const response = await api.get("/user/current-user", {
        withCredentials: true
      });

      setUserData(response.data.user || response.data);

    } catch (error) {
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const value = { userData, setUserData, loading };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;