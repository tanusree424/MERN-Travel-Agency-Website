import React, {useContext, useState} from 'react'
import { UserContext } from '../Context/UserContext'
import Login from '../Pages/Login';
import toast from 'react-hot-toast';

const AdminProtectedRoute = ({children}) => {
    const {userData} = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false)
    if (userData?.role === "Admin") {
      setIsAdmin(true)   
    }
 if (isAdmin) {
    return <>{children}</>
 }
  return (
    <>
    {toast.error("You are not Authorized to open this Page")
    
    }
    <Login/>
    </>
      
  )
}

export default AdminProtectedRoute