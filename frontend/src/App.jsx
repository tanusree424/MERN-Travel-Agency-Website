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
import Feedback from './Pages/Admin/Feedback'
import Blogs from './Pages/Admin/Blogs'
import BlogPage from './Component/BlogPage'
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
        <Route path='/blog/:id' element={<BlogPage/>} />
        
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
    <Route index element={<AdminProtectedRoute><AdminHome /></AdminProtectedRoute>} />   {/*  default */}
    <Route path="users" element={<AdminProtectedRoute><Users /></AdminProtectedRoute>} />
    <Route path="packages" element={<AdminProtectedRoute><Packages /></AdminProtectedRoute>} />
    <Route path='bookings' element={<AdminProtectedRoute><Bookings/></AdminProtectedRoute>} />
    <Route path='feedback' element={
      <AdminProtectedRoute>
      <Feedback/>
      </AdminProtectedRoute>
      } />
      <Route path='blogs' element={<AdminProtectedRoute>
        <Blogs/>
      </AdminProtectedRoute>} />


  </Route>
      </Routes>
    </>
  )
}

export default App;