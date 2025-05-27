import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginStart());

    // محاكاة بيانات تسجيل الدخول (يمكن ربطها لاحقًا بـ API)
    setTimeout(() => {
      if (email === 'admin@example.com' && password === 'admin') {
        const user = {
          id: '1',
          name: 'Admin User',
          role: 'admin',
          token: 'fake-jwt-token',
        };
        dispatch(loginSuccess(user));
        navigate('/admin/dashboard');
      } else if (email === 'employee@example.com' && password === 'employee') {
        const user = {
          id: '2',
          name: 'Employee User',
          role: 'employee',
          token: 'fake-jwt-token',
        };
        dispatch(loginSuccess(user));
        navigate('/employee/dashboard');
      } else {
        dispatch(loginFailure('Invalid email or password'));
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Employee Task Manager</h2>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-xs text-center text-gray-400">
          Login as:
          <div className="mt-1">
            <code className="block">admin@example.com / admin</code>
            <code className="block">employee@example.com / employee</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
