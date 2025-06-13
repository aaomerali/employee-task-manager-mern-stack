import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import {
  LogOut,
  Bell,
  ClipboardList,
  LayoutDashboard,
} from 'lucide-react';

const EmployeeSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const linkClass =
    'flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-purple-100 transition';

  return (
    <div className="w-full sm:w-64 bg-white shadow-xl h-full p-5 rounded-2xl">
      <h2 className="text-2xl font-bold text-purple-600 mb-8 text-center">
        Employee Panel
      </h2>
      <nav className="flex flex-col gap-4">
        <NavLink to="/employee/dashboard" className={linkClass}>
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>
        <NavLink to="/employee/tasks" className={linkClass}>
          <ClipboardList size={18} /> My Tasks
        </NavLink>
        <NavLink to="/employee/notifications" className={linkClass}>
          <Bell size={18} /> Notifications
        </NavLink>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-10 flex items-center gap-2 px-4 py-2 w-full text-white bg-gradient-to-r from-red-400 to-red-600 rounded-lg hover:opacity-90 transition"
      >
        <LogOut size={18} /> Logout
      </button>
    </div>
  );
};

export default EmployeeSidebar;
