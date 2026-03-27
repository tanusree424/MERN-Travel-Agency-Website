import Sidebar from '../../Component/Admin/Sidebar'
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className='flex w-[100vw]'>

      <Sidebar />

      <div className="flex-1">

        <div className="w-full h-[80px] bg-sky-700 flex justify-center items-center">
          <h2 className='text-white'>Admin Dashboard</h2>
        </div>

        <div className="p-5">
          {/* শুধু Outlet থাকবে */}
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default Dashboard;