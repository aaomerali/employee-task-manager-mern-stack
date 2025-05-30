import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { LogOut, Bell, Users, ClipboardList, LayoutDashboard } from 'lucide-react';

const Sidebar = () => {
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
      <h2 className="text-2xl font-bold text-purple-600 mb-8 text-center">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        <NavLink to="/admin/dashboard" className={linkClass}>
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>
        <NavLink to="/admin/users" className={linkClass}>
          <Users size={18} /> Manage Users
        </NavLink>
        <NavLink to="/admin/assign-tasks" className={linkClass}>
          <ClipboardList size={18} /> Assign Tasks
        </NavLink>
        <NavLink to="/admin/notifications" className={linkClass}>
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

export default Sidebar;
