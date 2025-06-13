import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import EmployeeSidebar from '../../components/EmployeeSidebar';

const EmployeeDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col sm:flex-row p-4 gap-4">
      <EmployeeSidebar />
      <div className="flex-1 bg-white p-6 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome {user?.name}!
        </h1>
        <p className="text-lg text-gray-600">
          You are logged in as{' '}
          <span className="font-semibold text-blue-500">{user?.role}</span>.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Total Tasks</h2>
            <p className="text-3xl font-bold">12</p>
          </div>
          <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Pending Tasks</h2>
            <p className="text-3xl font-bold">5</p>
          </div>
          <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-2">In Progress</h2>
            <p className="text-3xl font-bold">3</p>
          </div>
          <div className="bg-gradient-to-r from-purple-400 to-blue-400 text-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Completed Tasks</h2>
            <p className="text-3xl font-bold">4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
