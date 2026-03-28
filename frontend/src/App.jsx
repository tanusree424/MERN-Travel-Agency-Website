import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Home from './Pages/Home'
import Dashboard from './Pages/Admin/Dashboard'
import { Toaster } from 'react-hot-toast'
import Users from './Pages/Admin/Users'
import Packages from './Pages/Admin/Packages'

import AdminHome from './Pages/Admin/AdminHome'

import ProtectedRoute from './Component/ProtectedRoute'
import BookingPage from './Pages/BookingPage'
import Bookings from './Pages/Admin/Bookings'
import MyBookings from './Pages/myBookings'
import AllPackages from './Pages/AllPackages'
import ContactSection from './Component/ContactSection'
import About from './Pages/About'
import AdminProtectedRoute from './Component/AdminProtectedRoute'
import Profile from './Pages/ProfilePage'

function App() {
  return (
    <>
      <Toaster position='top-right' />

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/'  element={<Home />} />
        <Route path='/my-bookings' element={<MyBookings/>} />
        <Route path='/contacts' element={<ContactSection/>}/>
        <Route path='/about' element={<About/>} />
        
        <Route path='/packages' element={<AllPackages/>} />
        <Route path='profile' element={<ProtectedRoute>
          <Profile/>
        </ProtectedRoute>} />
        <Route path='/bookings/:id' element={
          <ProtectedRoute>
          <BookingPage/>
          </ProtectedRoute>
          } />

        {/*  admin route */}
       <Route path="/admin" element={
        <AdminProtectedRoute>
        <Dashboard />
        </AdminProtectedRoute>
        }>
    <Route index element={<AdminHome />} />   {/* 👈 default */}
    <Route path="users" element={<Users />} />
    <Route path="packages" element={<Packages />} />
    <Route path='bookings/' element={<Bookings/>} />

  </Route>
      </Routes>
    </>
  )
}

export default App;