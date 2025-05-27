import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import ManageUsers from '../pages/admin/ManageUsers';
import AssignTasks from '../pages/admin/AssignTasks';
import AdminNotifications from '../pages/admin/Notifications';

// Employee Pages
import EmployeeDashboard from '../pages/employee/Dashboard';
import MyTasks from '../pages/employee/MyTasks';
import EmployeeNotifications from '../pages/employee/Notifications';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role) {
    return <Navigate to={`/${user.role}/dashboard`} />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="admin">
            <ManageUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/assign"
        element={
          <ProtectedRoute role="admin">
            <AssignTasks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/notifications"
        element={
          <ProtectedRoute role="admin">
            <AdminNotifications />
          </ProtectedRoute>
        }
      />

      {/* Employee Routes */}
      <Route
        path="/employee/dashboard"
        element={
          <ProtectedRoute role="employee">
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee/tasks"
        element={
          <ProtectedRoute role="employee">
            <MyTasks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee/notifications"
        element={
          <ProtectedRoute role="employee">
            <EmployeeNotifications />
          </ProtectedRoute>
        }
      />

      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
